const mockFile = {
  query_exists: jest.fn(() => false),
  make_directory_with_parents: jest.fn(() => { throw new Error('Mock error'); }),
  monitor_directory: jest.fn(() => ({
    connect: jest.fn(),
    cancel: jest.fn(),
  })),
  replace_contents: jest.fn(() => { throw new Error('Mock error'); }),
  delete: jest.fn(() => { throw new Error('Mock error'); }),
  query_info: jest.fn(() => ({
    get_permissions: jest.fn(() => ({})),
  })),
  set_attribute_uint32: jest.fn(),
  get_path: jest.fn(path => `/home/user/.local/share/applications`),
  load_contents: jest.fn(() => [false, null]),
};

global.imports = {
  gi: {
    Gio: {
      File: {
        new_for_path: jest.fn(path => mockFile),
      },
      FileMonitorFlags: {
        NONE: 0,
      },
      FileMonitorEvent: {
        CHANGES_DONE_HINT: 0,
        FILE_CREATED: 1,
        FILE_DELETED: 2,
      },
      FilePermission: {
        EXECUTE: 1,
      },
      FileQueryInfoFlags: {
        NONE: 0,
      },
      FileCreateFlags: {
        REPLACE_DESTINATION: 1,
      },
    },
    GLib: {
      get_home_dir: jest.fn(() => '/home/user'),
      get_user_data_dir: jest.fn(() => '/home/user/.local/share'),
      build_pathv: jest.fn((sep, paths) => paths.join(sep)),
      path_get_basename: jest.fn(path => path.split('/').pop()),
    },
  },
};

global.log = jest.fn();
global.logError = jest.fn();
