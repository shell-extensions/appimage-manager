# Data Model: AppImage Manager Gnome Extension

## Entities

### AppImage
- **description**: A self-contained executable application.
- **attributes**:
  - `filePath`: string (path to the AppImage file)
  - `name`: string (name of the application)
  - `executable`: boolean (whether the file is executable)

### Launcher
- **description**: A `.desktop` file for launching an application.
- **attributes**:
  - `filePath`: string (path to the `.desktop` file)
  - `name`: string (name of the application)
  - `exec`: string (command to execute)
  - `icon`: string (path to the icon)
  - `categories`: string (categories for the application menu)
