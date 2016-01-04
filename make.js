;(function() {

	var root = this;
	var prevNameSpace = root.make;

	var make = {};
	make.Version = '0.1.0';

    var toString = Object.prototype.toString;
    var arraySlice = Array.prototype.slice;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    make.array = Array.isArray || function(value) {
        return toString.call(value) === '[object Array]';
    };

    make.boolean = function(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    };

    make.function = function(value) {
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    };

    make.NaN = function(value) {
        return value !== value;
    };

    make.null = function(value) {
        return value === null;
    };

    make.number = function(value) {
        return !make.Nan(value) && toString.call(value) === '[object Number]';
    };

    make.object = function(value) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    };

    make.regexp = function(value) {
        return toString.call(value) === '[object RegExp]';
    };

    make.undefined = function(value) {
        return value === void 0;
    };

    make.string = function(value) {
        return toString.call(value) === '[object String]';
    };

    make.reNameSpace = function() {
        root.make = prevNameSpace;
        return this;
    };

    make.dom = function(selector, createOptions) {
        var self = this,
            elements = [];
        if (createOptions) {
            var element = document.createElement(selector);
            for (var k in createOptions) {
                element[k] = createOptions[k];
            }
        } else {
            if (make.string(selector)) {
                elements = [].slice.call(document.querySelectorAll(selector));
            } else {
                if (make.object(selector) && selector.attributes) { elements = [selector]; }
            }
            self._elements = elements;
            self.length = elements.length;
            return self;
        }
    };

    make.on = function(events, fn) {
        var self = this,
            elements = self._elements;
        events = events.split(" ");
        for (var i = 0, lenEl = elements.length; i < lenEl; i++) {
            var element = elements[i];
            for (var j = 0, lenEv = events.length; j < lenEv; j++) {
                if (element.addEventListener) { element.addEventListener(events[j], fn, false); }
            }
        }

    }

    make.ready = function(callback) {
        if (document && make.function(document.addEventListener)) {
            document.addEventListener("DOMContentLoaded", callback, false);
        } else if (window && make.function(window.addEventListener)) {
            window.addEventListener("load", callback, false);
        } else {
            document.onreadystatechange = function() {
                if (document.readyState === "complete") { callback(); }
            }
        }
    };

    window.make = make;
})();