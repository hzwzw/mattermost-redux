// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelectorCreator, defaultMemoize} from 'reselect';
import shallowEqual from 'shallow-equals';

export function memoizeResult(func) {
    let lastArgs = null;
    let lastResult = null;

    // we reference arguments instead of spreading them for performance reasons
    return function shallowCompare() {
        if (!shallowEqual(lastArgs, arguments)) { //eslint-disable-line prefer-rest-params
            // apply arguments instead of spreading for performance.
            const result = Reflect.apply(func, null, arguments); //eslint-disable-line prefer-rest-params
            if (!shallowEqual(lastResult, result)) {
                lastResult = result;
            }
        }

        lastArgs = arguments; //eslint-disable-line prefer-rest-params
        return lastResult;
    };
}

// Use this selector when you want a shallow comparison of the arguments and you want to memoize the result
// try and use this only when your selector returns an array of ids
export const createIdsSelector = createSelectorCreator(memoizeResult);

// Use this selector when you want a shallow comparison of the arguments and you don't need to memoize the result
export const createShallowSelector = createSelectorCreator(defaultMemoize, shallowEqual);

// isMinimumServerVersion will return true if currentVersion is equal to higher or than the
// the provided minimum version. A non-equal major version will ignore minor and dot
// versions, and a non-equal minor version will ignore dot version.
// currentVersion is a string, e.g '4.6.0'
// minMajorVersion, minMinorVersion, minDotVersion are integers
export const isMinimumServerVersion = (currentVersion, minMajorVersion = 0, minMinorVersion = 0, minDotVersion = 0) => {
    if (!currentVersion || typeof currentVersion !== 'string') {
        return false;
    }

    const split = currentVersion.split('.');

    const major = parseInt(split[0], 10);
    const minor = parseInt(split[1] || '0', 10);
    const dot = parseInt(split[2] || '0', 10);

    if (major > minMajorVersion) {
        return true;
    }
    if (major < minMajorVersion) {
        return false;
    }

    // Major version is equal, check minor
    if (minor > minMinorVersion) {
        return true;
    }
    if (minor < minMinorVersion) {
        return false;
    }

    // Minor version is equal, check dot
    if (dot > minDotVersion) {
        return true;
    }
    if (dot < minDotVersion) {
        return false;
    }

    // Dot version is equal
    return true;
};

// Generates a RFC-4122 version 4 compliant globally unique identifier.
export function generateId() {
    // implementation taken from http://stackoverflow.com/a/2117523
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    id = id.replace(/[xy]/g, (c) => {
        var r = Math.floor(Math.random() * 16);

        var v;
        if (c === 'x') {
            v = r;
        } else {
            v = (r & 0x3) | 0x8;
        }

        return v.toString(16);
    });

    return id;
}

export function isEmail(email) {
    // writing a regex to match all valid email addresses is really, really hard. (see http://stackoverflow.com/a/201378)
    // this regex ensures:
    // - at least one character that is not a space, comma, or @ symbol
    // - followed by a single @ symbol
    // - followed by at least one character that is not a space, comma, or @ symbol
    // this prevents <Outlook Style> outlook.style@domain.com addresses and multiple comma-separated addresses from being accepted
    return (/^[^ ,@]+@[^ ,@]+$/).test(email);
}

export function buildQueryString(parameters) {
    const keys = Object.keys(parameters);
    if (keys.length === 0) {
        return '';
    }

    let query = '?';
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        let value = parameters[key];
        if (typeof value === 'boolean') {
            value = value ? 1 : 0;
        }
        query += key + '=' + encodeURIComponent(value);

        if (i < keys.length - 1) {
            query += '&';
        }
    }

    return query;
}
