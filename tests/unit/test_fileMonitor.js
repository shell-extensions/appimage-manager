const { FileMonitor } = require('../../src/fileMonitor');

describe('FileMonitor', () => {
  let fileMonitor;

  beforeEach(() => {
    fileMonitor = new FileMonitor();
  });

  it('should start and stop monitoring', () => {
    const onFileAdded = jest.fn();
    const onFileRemoved = jest.fn();

    imports.gi.Gio.File.new_for_path().query_exists.mockImplementation(() => true);

    const result = fileMonitor.startMonitoring('/tmp/test-dir', onFileAdded, onFileRemoved);
    expect(result).toBe(true);
    fileMonitor.stopMonitoring();
  });
});