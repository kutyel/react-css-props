"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (theme, mapper) {
    return function (props, defaultClass) {
        if (Object.keys(props).length) {
            return Object.keys(props).map(function (className) {
                return mapper ? theme[mapper(className)] : theme[className];
            });
        } else {
            return defaultClass ? [theme[defaultClass]] : [];
        }
    };
};