var Cell = require('./cell.js');
var _ = require('underscore');

var Grid = function (gridElts) {
    if (gridElts) {
        if (!_.isArray(gridElts) || gridElts.length !== 81) {
            throw new Error ('Invalid parameter to construct a grid');
        }
    } else {
        gridElts = [];
    }
    this._cells = new Array();
    for (var i = 0; i < 81; i++) {
        this._cells.push(new Cell(gridElts[i] || undefined));
    }
};

/**
 * Validates the grid and the values of its elements
 * @returns {Boolean}
 **/
Grid.prototype.validate = function () {
    throw new Error('not implemented');
};

/**
 * Returns a row from the grid
 * @returns {Array} The ordered row
 **/
Grid.prototype.getRow = function (index) {
    if (index >= 9) {
        throw new Error('Trying to fetch an out of bound row of index: ' + index);
    }
    var start = index * 9,
        row = [];
    for (var i = start; i < start + 9; i++) {
        row.push(this._cells[i]);
    }
    return row;
};

/**
 * Returns a column from the grid
 * @returns {Array} The ordered col
 **/
Grid.prototype.getCol = function (index) {
    if (index >= 9) {
        throw new Error('Trying to fetch an out of bound column of index: ' + index);
    }
    var start = (index + 9) % 9,
        col = [];
    for (var i = start; i < 81; i = i + 9) {
        col.push(this._cells[i]);
    }
    return col;
};

/**
 * Returns a square from the grid
 * @returns {Array} The ordered col
 **/
Grid.prototype.getSquare = function (cell) {
    throw new Error('not implemented');
};

/**
 * Returns a cell from the grid
 * @param {Number} rowIndex The number of the row in which the cell is, if colIndex is specified. The global index to the cell in thr grid, otherwise
 * @param {Number} The number of the column in which to find the cell
 * @returns {Array} The cell at the specified index
 **/
Grid.prototype.getCell = function (rowIndex, colIndex) {
    throw new Error('not implemented');
};

/**
 * Updates the value of a cell, and updates its neighbors
 * @deprecated Use Cell::setValue instead
 * Update the prototype of Cell to bind some events to update the neighbours instead.
 * So, change the name of the method below to 'updateEvents' or something
 **/
Grid.prototype.writeCell = function (rowIndex, colIndex, value) {
    throw new Error ('not implemented');
};

module.exports = Grid;