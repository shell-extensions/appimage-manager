# Quickstart: AppImage Manager Gnome Extension

## Installation

1.  Make sure you have `gnome-shell-extensions` and `unzip` installed.
2.  Clone the repository: `git clone https://github.com/ignaci0/appimage-manager.git`
3.  `cd appimg-manager`
4.  Run `make zip` to build the extension.
5.  Run `make install` to install the extension.
6.  Restart GNOME Shell by pressing `Alt+F2`, typing `r`, and pressing `Enter`.
7.  Enable the "AppImage Manager" extension in the "Extensions" application.

## Usage

1.  By default, the extension monitors the `~/Applications` directory. You can change this in the extension's preferences.
2.  Copy an AppImage file to the monitored directory.
3.  The extension will automatically create a launcher for the application in the GNOME application menu.
4.  If you remove the AppImage file, the launcher will be automatically removed.
