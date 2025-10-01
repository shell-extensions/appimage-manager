const { LauncherService } = require('../../src/launcherService');

describe('LauncherService', () => {
  let launcherService;

  beforeEach(() => {
    jest.clearAllMocks();
    launcherService = new LauncherService();
  });

  it('should create a launcher', () => {
    const metadata = {
      name: 'My Cool App',
      path: '/path/to/my-cool-app.AppImage',
      icon: 'application-x-appimage',
      categories: ['Utility'],
    };

    const desktopFilePath = launcherService.createLauncher(metadata);
    expect(desktopFilePath).toBe('/home/user/.local/share/applications/My Cool App.desktop');
  });

  it('should remove a launcher', () => {
    const Gio = require('gi://Gio');
    const mockFile = {
      query_exists: jest.fn(() => true),
      delete: jest.fn(),
    };
    Gio.File.new_for_path.mockReturnValue(mockFile);

    const result = launcherService.deleteLauncher('My Cool App');
    expect(result).toBe(true);
    expect(mockFile.delete).toHaveBeenCalled();
  });
});