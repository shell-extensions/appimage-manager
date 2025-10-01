import Gio from 'gi://Gio';
import GLib from 'gi://GLib';

export class SettingsManager {
    constructor(extension) {
        this._settings = this._getSettings(extension);
    }

    _getSettings(extension) {
        let schemaId = 'org.gnome.shell.extensions.appimage-manager';
        return new Gio.Settings({
            settings_schema: Gio.SettingsSchemaSource.new_from_directory(
                extension.dir.get_child('schemas').get_path(),
                null,
                false
            ).lookup(schemaId, true)
        });
    }

    getMonitoredDirectory() {
        let storedPath = this._settings.get_string('monitored-directory');
        if (!storedPath) {
            return GLib.build_pathv('/', [GLib.get_home_dir(), 'Applications']);
        }
        return storedPath;
    }

    setMonitoredDirectory(directoryPath) {
        this._settings.set_string('monitored-directory', directoryPath);
    }
}
