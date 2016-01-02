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

    window.make = make;
})();