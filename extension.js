console.log('AppImage Manager extension file is being read');
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';

import {FileMonitor} from './fileMonitor.js';
import {AppImageManager} from './appImageManager.js';
import {LauncherService} from './launcherService.js';
import {SettingsManager} from './settingsManager.js';
import { log, logError } from './logger.js';

export default class AppImageManagerExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._settingsManager = new SettingsManager(this);
        this._fileMonitor = new FileMonitor();
        this._appImageManager = new AppImageManager(this._fileMonitor);
        this._launcherService = new LauncherService();
    }

    async enable() {
        log(`Enabling ${this.metadata.name} extension`);

        let monitoredDirectory = this._settingsManager.getMonitoredDirectory();

        this._fileMonitor.startMonitoring(
            monitoredDirectory,
            (filePath) => {
                this._appImageManager.addAppImage(filePath);
            },
            async (filePath) => {
                try {
                    let metadata = await this._appImageManager.extractMetadata(filePath);
                    this._launcherService.deleteLauncher(metadata.name);
                } catch (e) {
                    logError(`Failed to process AppImage ${filePath}: ${e.message}`);
                }
            }
        );

        let dir = Gio.File.new_for_path(monitoredDirectory);
        if (dir.query_exists(null)) {
            let enumerator = dir.enumerate_children('standard::name,standard::type', Gio.FileQueryInfoFlags.NONE, null);
            let files = [];
            let fileInfo;
            while ((fileInfo = enumerator.next_file(null)) !== null) {
                files.push(fileInfo);
            }
            enumerator.close(null);

            for (const fileInfo of files) {
                let child = dir.get_child(fileInfo.get_name());
                this._appImageManager.addAppImage(child.get_path());
            }
        }
    }

    disable() {
        log(`Disabling ${this.metadata.name} extension`);
        this._fileMonitor.stopMonitoring();

        let monitoredDirectory = this._settingsManager.getMonitoredDirectory();
        let dir = Gio.File.new_for_path(monitoredDirectory);
        if (dir.query_exists(null)) {
            let enumerator = dir.enumerate_children('standard::name,standard::type', Gio.FileQueryInfoFlags.NONE, null);
            let fileInfo;
            while ((fileInfo = enumerator.next_file(null)) !== null) {
                let child = dir.get_child(fileInfo.get_name());
                if (fileInfo.get_file_type() === Gio.FileType.REGULAR && this._appImageManager.isAppImage(child.get_path())) {
                    let fileName = GLib.path_get_basename(child.get_path());
                    let appImageName = fileName.replace(/\.AppImage$/, '');
                    this._launcherService.deleteLauncher(appImageName);
                }
            }
            enumerator.close(null);
        }
    }
}
