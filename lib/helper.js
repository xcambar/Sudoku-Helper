var Grid = require('./grid'),
	Cell = require('./cell'),
	_ = require('underscore'),
	inherits = require('util').inherits,
	EventEmitter = require('events').EventEmitter;

/**
 * @TODO Untested
 */
var SudokuHelper = function (data) {
	
	this.__defineGetter__('initialData', function () {
		return data;
	});
	
	var grid = null,
		requiresRun = true;
	
	this.on('run', function () {
		requiresRun = false;
		//Performs calculations and updates
		_.each(grid._cells, function (cell) {
			var values = cell.getValues();
			if (!cell._isFinal && values.length === 1) {
				cell.setValue(values[0]);
				requiresRun = true;
			}
		});
		if (requiresRun === true) {
			this.emit('run');
		} else {
			this.emit('done', null, grid.validate(), grid);
		}
	});
	
	grid = new Grid(this.initialData);
};

inherits(SudokuHelper, EventEmitter);

SudokuHelper.prototype.run = function () {
	this.emit('run');
};

module.exports = SudokuHelper;