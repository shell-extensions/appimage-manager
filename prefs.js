import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
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

        const monitoredDirectoryEntry = new Gtk.Entry({
            text: settings.get_string('monitored-directory'),
            hexpand: true,
        });

        monitoredDirectoryRow.add_suffix(monitoredDirectoryEntry);
        monitoredDirectoryRow.activatable_widget = monitoredDirectoryEntry;

        monitoredDirectoryEntry.connect('changed', () => {
            settings.set_string('monitored-directory', monitoredDirectoryEntry.get_text());
        });

        window.add(page);
    }
}