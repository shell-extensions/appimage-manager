# API Contracts: AppImage Manager Gnome Extension

## AppImageManager

### `addAppImage(filePath)`

- **Description**: Creates a launcher for a new AppImage.
- **Parameters**:
  - `filePath` (string): The path to the AppImage file.
- **Returns**: `void`

### `removeAppImage(filePath)`

- **Description**: Removes the launcher for an existing AppImage.
- **Parameters**:
  - `filePath` (string): The path to the AppImage file.
- **Returns**: `void`

## FileMonitor

### `start()`

- **Description**: Starts monitoring the directory for changes.
- **Parameters**: `none`
- **Returns**: `void`

### `stop()`

- **Description**: Stops monitoring the directory for changes.
- **Parameters**: `none`
- **Returns**: `void`

## LauncherService

### `createLauncher(appImage)`

- **Description**: Creates a `.desktop` file for an AppImage.
- **Parameters**:
  - `appImage` (AppImage): The AppImage to create the launcher for.
- **Returns**: `void`

### `removeLauncher(appImage)`

- **Description**: Removes the `.desktop` file for an AppImage.
- **Parameters**:
  - `appImage` (AppImage): The AppImage to remove the launcher for.
- **Returns**: `void`
