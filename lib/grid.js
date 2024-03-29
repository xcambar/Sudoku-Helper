var Cell = require('./cell.js');
var _ = require('underscore');

/**
 * @constructor
 * @param {Array} gridElts The list of elements we want in the grid
 * @returns {Grid}
 * @TODO Implement the get(Row|Col|Region) search by Cell
 */
var Grid = function (gridElts) {
    if (gridElts) {
        if (!_.isArray(gridElts) || gridElts.length !== 81) {
            throw new Error ('Invalid parameter to construct a grid');
        }
    } else {
        gridElts = [];
    }
    this._cells = new Array();
    
    //Instanciates empty cells
    for (var i = 0; i < 81; i++) {
        this._cells.push(new Cell());
    }
    
    /**
     * the scope (ie this object) is the cell being updated
     */
    var _updateListener = function (type, collection, currentIdx) {
    	var me = this; // *this* is a Grid instance
    	return function (err, value) { // *this* is a Cell instance
    		var filteredCollection = _.filter(collection, function (elt) {
    			return elt !== this;
    		}, this);
    		_.each(filteredCollection, function (comparedRow) {
    			var values = comparedRow.getValues();
				if (values.length === 1 && values[0] === value) {
					var values = _.map(filteredCollection, function (v) {
						var _v = v.getValues();
						return _v.length > 1 ? '[' + _v + ']' : _v;
					});
					throw new Error('Value ' + value + ' set twice in the ' + type + ' ' + values);
				}
				comparedRow.removePossibleValue(value);
				if (comparedRow.getValues().length === 0) {
					throw new Error('A ' + type + ' contains cells with no possible value');
				}
    		}, this);
    	};
	};
    
    // Sets the event listeners
    for (var idx in _.range(0, 9)) {
    	var row = this.getRow(idx);
    	for (var rowCellIdx in row) {
    		var me = row[rowCellIdx];
    		me.on('value', _updateListener.call(this, 'row', row, rowCellIdx));
    	}
    	var col = this.getCol(idx);
    	for (var colCellIdx in col) {
    		var me = col[colCellIdx];
    		me.on('value', _updateListener.call(this, 'col', col, colCellIdx));
    	}
    	var region = this.getRegion(idx);
    	for (var regionCellIdx in region) {
    		var me = region[regionCellIdx];
    		me.on('value', _updateListener.call(this, 'region', region, regionCellIdx));
    	}
    }

    //Sets the values
    for (var i = 0; i < 81; i++) {
    	var value = gridElts[i] || undefined;
		this._cells[i].setValue(value);
    }
};

/**
 * Validates the grid and the values of its elements
 * @returns {Boolean}
 **/
Grid.prototype.validate = function () {
    for (var i = 0; i < this._cells.length; i++) {
    	if (this._cells[i].getValues().length > 1) {
    		return false;
    	}
    }
    return true;
};

/**
 * Returns a row from the grid
 * @param {Cell|Number} The cell for which we want the row, or the 0-based number of the row
 * @returns {Array} The ordered row
 **/
Grid.prototype.getRow = function (cell) {
    if (cell >= 9) {
        throw new Error('Trying to fetch an out of bound row of index: ' + cell);
    }
    var start = cell * 9,
        row = [];
    for (var i = start; i < start + 9; i++) {
        row.push(this._cells[i]);
    }
    return row;
};

/**
 * Returns a column from the grid
 * @param {Cell|Number} The cell for which we want the col, or the 0-based number of the col
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
 * Returns a region from the grid
 * @param {Cell|Number} The cell for which we want the region, or the 0-based number of the region 
 * @returns {Array} The region
 **/
Grid.prototype.getRegion = function (cell) {
	var region = [];
    if (_.isNumber(parseInt(cell, 10))) {
    	var minCol = (cell % 3) * 3;
    	var rangeCol = _.range(minCol, minCol + 3);
    	var minRow = Math.floor(cell / 3) * 3;
    	var rangeRow = _.range(minRow, minRow + 3);
    	for (var x in rangeCol) {
    		for (var y in rangeRow) {
        		region.push(this.getCell(rangeRow[x], rangeCol[y]));
        	}
    	}
    }
    return region;
};

/**
 * Returns a cell from the grid
 * @param {Number} rowIndex The number of the row in which the cell is, if colIndex is specified. The global index to the cell in the grid, otherwise
 * @param {Number} colIndex The number of the column in which to find the cell
 * @returns {Cell} The cell at the specified index
 **/
Grid.prototype.getCell = function (rowIndex, colIndex) {
	if (_.isUndefined(colIndex)) {
		return this._cells[rowIndex];
	}
    return this.getRow(rowIndex)[colIndex];
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

Grid.prototype.toString = function () {
	var out = '';
	for (var rIdx = 0; rIdx < 9; rIdx++) {
		var row = this.getRow(rIdx);
		for (var cIdx = 0; cIdx < 9; cIdx++) {
			var values = row[cIdx].getValues();
			out += values.length === 1 ? values : '[' + values + ']'; 
			if (cIdx === 8) {
				out += '\n';
			} else {
				out +=',';
			}
		}
	}
	return out;
};
module.exports = Grid;