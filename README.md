# AppImage Manager Gnome Extension

This GNOME Shell extension automatically integrates AppImage applications into the GNOME application launcher menu.

## Features

- Monitors a configurable directory (default: `~/Applications`) for AppImage files.
- Automatically creates `.desktop` launcher files for added AppImages.
- Removes `.desktop` launcher files when AppImages are removed.
- Ensures AppImage files are executable.
- Extracts basic metadata from AppImages for launcher details.

## Installation

1.  **Clone this repository**:
    ```bash
    git clone https://github.com/ignaci0/appimage-manager.git
    cd appimg-manager
    ```
2.  **Install the extension**:
    ```bash
    make install
    ```
    This command will build the extension and install it into your GNOME Shell extensions directory.
3.  **Enable the extension** using GNOME Tweaks or by running the command:
    ```bash
    gnome-extensions enable appimage-manager@ignaci0
    ```

## Configuration

Access the extension preferences through GNOME Tweaks to change the monitored directory.

## Development

### Project Structure

- `src/`: Contains the core extension logic.
- `prefs.js`: User interface for extension preferences.
- `tests/`: Unit and integration tests.

### Building

To create a distributable `.zip` package for the extension:
```bash
make zip
```
This will generate `appimage-manager@ignaci0.zip` in the project root.

## Usage

1.  Create a directory for your AppImages (e.g., `~/Applications`).
2.  Move your AppImage files into this directory.
3.  The extension will automatically create launchers for them in the GNOME application launcher.

### Running Tests

```bash
npm test
```

## License

[TODO: Add license information]