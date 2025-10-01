import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import { log, logError } from './logger.js';

export class FileMonitor {
    constructor() {
        this._monitor = null;
        this._directory = null;
        this._onFileAdded = null;
        this._onFileRemoved = null;
    }

    startMonitoring(directoryPath, onFileAdded, onFileRemoved) {
        this._directory = Gio.File.new_for_path(directoryPath);
        if (!this._directory.query_exists(null)) {
            // Create the directory if it doesn't exist
            try {
                this._directory.make_directory_with_parents(null);
                log(`Created monitored directory: ${directoryPath}`);
            } catch (e) {
                logError(`Failed to create monitored directory ${directoryPath}: ${e.message}`);
                return false;
            }
        }

        this._onFileAdded = onFileAdded;
        this._onFileRemoved = onFileRemoved;

        this._monitor = this._directory.monitor_directory(Gio.FileMonitorFlags.NONE, null);
        this._monitor.connect('changed', (monitor, file, otherFile, eventType) => {
            log(`File monitor event: ${eventType}`);
            switch (eventType) {
                case Gio.FileMonitorEvent.CHANGES_DONE_HINT:
                    // This event is often fired after a file is added/removed/changed.
                    // We need to re-scan the directory or rely on other events.
                    // For simplicity, we'll rely on the ADDED/DELETED events for now.
                    break;
                case Gio.FileMonitorEvent.CREATED:
                    {
                        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
                            const filePath = file.get_path();
                            if (filePath.endsWith('.desktop')) {
                                try {
                                    const [success, contents] = file.load_contents(null);
                                    if (success) {
                                        const decoder = new TextDecoder('utf-8');
                                        const contentsStr = decoder.decode(contents);
                                        if (contentsStr.includes('# Created by AppImage Manager')) {
                                            return GLib.SOURCE_REMOVE; // Ignore file created by the extension
                                        }
                                    }
                                } catch (e) {
                                    logError(`Failed to read file ${filePath}: ${e.message}`);
                                }
                            }
                            if (this._onFileAdded) {
                                this._onFileAdded(filePath);
                            }
                            return GLib.SOURCE_REMOVE;
                        });
                    }
                    break;
                case Gio.FileMonitorEvent.DELETED:
                    if (this._onFileRemoved) {
                        this._onFileRemoved(file.get_path());
                    }
                    break;
                default:
                    log(`Unhandled file monitor event: ${eventType}`);
            }
        });
        log(`Started monitoring directory: ${directoryPath}`);
        return true;
    }

    stopMonitoring() {
        if (this._monitor) {
            this._monitor.cancel();
            this._monitor = null;
            log(`Stopped monitoring directory: ${this._directory.get_path()}`);
        }
    }

    pause() {
        if (this._monitor) {
            this._monitor.cancel();
            this._monitor = null;
            log('Paused file monitoring');
        }
    }

    resume() {
        if (!this._monitor && this._directory) {
            this.startMonitoring(this._directory.get_path(), this._onFileAdded, this._onFileRemoved);
            log('Resumed file monitoring');
        }
    }
}
