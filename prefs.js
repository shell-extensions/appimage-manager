import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';


export default class AppImageManagerPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({
            title: 'General',
        });
        page.add(group);

        const monitoredDirectoryRow = new Adw.ActionRow({
            title: 'Monitored Directory',
        });
        group.add(monitoredDirectoryRow);

        const monitoredDirectoryButton = new Gtk.Button({
            label: 'Select Monitored Directory',
        });

        const currentMonitoredDirectory = settings.get_string('monitored-directory');
        if (currentMonitoredDirectory) {
            monitoredDirectoryButton.set_label(currentMonitoredDirectory);
        }

        monitoredDirectoryButton.connect('clicked', () => {
            const dialog = new Gtk.FileDialog({
                title: 'Select Monitored Directory',
            });

            dialog.select_folder(window, null, (dialog, res) => {
                try {
                    const folder = dialog.select_folder_finish(res);
                    if (folder) {
                        const path = folder.get_path();
                        settings.set_string('monitored-directory', path);
                        monitoredDirectoryButton.set_label(path);
                    }
                } catch (e) {
                    logError(e, 'Failed to select folder');
                }
            });
        });

        monitoredDirectoryRow.add_suffix(monitoredDirectoryButton);
        monitoredDirectoryRow.activatable_widget = monitoredDirectoryButton;

        window.add(page);
    }
}