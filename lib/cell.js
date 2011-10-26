var _ = require('underscore');

var Cell = function (value) {
    if (_.isNumber(value) && value) {
        this.setValue(value);
    } else {
        this.value = 0;
        _.range(1, 10).forEach(this.addPossibleValue, this);
    }
};

/**
 * Should not be used by the developers
 * Represents the int representation of all the possible values for the cell
 * @type Number
 **/
Cell.prototype._value = 0;

/**
 * Returns the possible values for a cell, as an array of integer
 * When the array contains only 1 cell, the Cell is considered filled
 * @returns Array
 **/
Cell.prototype.getValues = function () {
    var values = new Array();
    _.range(1, 10).forEach(function (value, index, array) {
        if ((1 << (value-1)) & this._value) {
            values.push(value);
        }
    }, this);
    return values;
};

/**
 * Returns the concatenated string of the possible values
 **/
Cell.prototype.toString = function () {
    return this.getValues().join(',');
};

/**
 * Updates the cell such as one possible value is removed
 * @param {Number} the integer value to remove
 **/
Cell.prototype.removePossibleValue = function (v) {
    if (v < 1) {
        return;
    }
    if (this._value & (1 << (v-1))) {
        this._value = this._value ^ (1 << (v-1));
    }
};

/**
 * Updates the cell such as one possible value is added
 * @param {Number} the integer value to add
 **/
Cell.prototype.addPossibleValue = function (value) {
    if (value < 1) {
        return;
    }
    this._value = this._value | (1 << (value-1));
};

/**
 * Updates the cell such as one and only one value is set.
 * The value is passed as a parameter
 * @param {Number} the integer value to set
 **/
Cell.prototype.setValue = function (value) {
    if (value < 1) {
        return;
    }
    this._value = 1 << (value-1);
};

module.exports = Cell;
