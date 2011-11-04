var _ = require('underscore'),
	inherits = require('util').inherits,
	EventEmitter = require('events').EventEmitter;

var Cell = function (value) {
    if (_.isNumber(value) && value) {
        this.setValue(value);
    } else {
        this._value = 0;
        _.range(1, 10).forEach(this.addPossibleValue, this);
    }
    EventEmitter.call(this);
};

inherits(Cell, EventEmitter);

/**
 * Should not be used by the developers
 * Represents the int representation of all the possible values for the cell
 * @type Number
 **/
Cell.prototype._value = 0;

/**
 * Tells whether the value has been declared final
 * @type Boolean
 **/
Cell.prototype._isFinal = false;

/**
 * Returns the possible values for a cell, as an array of integer
 * It is a human readable set of values for the cell.
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
    var _previousValue = this._value;
    if (this._value & (1 << (v-1))) {
        this._value = this._value ^ (1 << (v-1));
    }
    if (this.getValues().length === 0) {
    	this._value = _previousValue;
    	throw new Error('Can not let a cell with no value. Resetting the value.');
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
 * The value is passed as a parameter.
 * The value passed to the callback is the HUMAN READABLE value!
 * @param {Number} the integer value to set
 **/
Cell.prototype.setValue = function (value) {
    if (isNaN(parseInt(value, 10)) || value < 1) {
        return;
    }
    var previousValue = this._value;
    try {
    	this.emit('value', null, value); // Event listeners throw exception to stop execution
    	this._value = 1 << (value-1);
    	this._isFinal = true; //@TODO Test isFinal
    } catch (e) {
    	this._value = previousValue; //@TODO Test the reset of the previous value
    	//@TODO Resets the possible value on the other cells of the scope
    	throw e;
    }
};

module.exports = Cell;
