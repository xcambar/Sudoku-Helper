var Grid = require('./grid'),
	_ = require('underscore');

var SudokuHelper = function (grid) {
	if (!(grid instanceof Grid)) {
		throw new Error ('Invalid Parameter passed to the solver. Must be an instance if Grid');
	}
	
	this.__defineGetter__('grid', function () {
		return grid;
	});
	
	this.on('run', function () {
		var requiresRun = false;
		
		//Performs calculations and updates
		if (requiresRun === true) {
			this.emit('run');
		}
	});
	this.emit('run');
};
