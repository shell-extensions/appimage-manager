const { AppImageManager } = require('../../src/appImageManager');

describe('AppImageManager', () => {
  let appImageManager;

  beforeEach(() => {
    jest.clearAllMocks();
    appImageManager = new AppImageManager();
  });

  it('should identify an AppImage file', () => {
    expect(appImageManager.isAppImage('test.AppImage')).toBe(true);
  });

  it('should not identify a non-AppImage file', () => {
    expect(appImageManager.isAppImage('test.txt')).toBe(false);
  });

  it('should extract metadata from an AppImage file name', async () => {
    const Gio = require('gi://Gio');
    Gio.File.new_for_path().get_child().query_exists.mockReturnValue(true);

    const metadata = await appImageManager.extractMetadata('/path/to/my-cool-app.AppImage');
    expect(metadata.name).toBe('My Cool App');
  });
});