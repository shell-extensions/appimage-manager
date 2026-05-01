'use strict';

const GObject = {
    Object: class {
        _init() {}
    },
    registerClass: jest.fn((options, cls) => cls),
};

export default GObject;
