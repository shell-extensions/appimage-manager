'use strict';

import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';

import { log, logError } from './logger.js';

export var CacheManager = GObject.registerClass({
    GTypeName: 'CacheManager'
}, class CacheManager extends GObject.Object {
    _init(params) {
        super._init(params);
        this._cacheFile = Gio.File.new_for_path(
            GLib.get_user_cache_dir() + '/appimage-manager/cache.json'
        );
        this._cache = {};
        this._loadCache();
    }

    _loadCache() {
        if (!this._cacheFile.query_exists(null)) {
            log('Cache file does not exist. Creating it.');
            this._cacheFile.get_parent().make_directory_with_parents(null);
            this._cacheFile.create(Gio.FileCreateFlags.NONE, null);
            this._saveCache();
        } else {
            try {
                let [ok, contents] = this._cacheFile.load_contents(null);
                if (ok) {
                    const decoder = new TextDecoder('utf-8');
                    const contentsStr = decoder.decode(contents);
                    this._cache = JSON.parse(contentsStr);
                }
            } catch (e) {
                logError('Failed to load cache: ' + e);
            }
        }
    }

    _saveCache() {
        try {
            let contents = JSON.stringify(this._cache, null, 2);
            this._cacheFile.replace_contents(
                contents,
                null,
                false,
                Gio.FileCreateFlags.REPLACE_DESTINATION,
                null
            );
        } catch (e) {
            logError('Failed to save cache: ' + e);
        }
    }

    add(appImage) {
        this._cache[appImage.path] = appImage;
        this._saveCache();
    }

    remove(appImagePath) {
        delete this._cache[appImagePath];
        this._saveCache();
    }

    get(appImagePath) {
        return this._cache[appImagePath];
    }

    getAll() {
        return this._cache;
    }
});
