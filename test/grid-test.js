var vows = require('vows'),
    Grid = require('../lib/grid.js'),
    Cell = require('../lib/cell.js'),
    assert = require('assert'),
    _ = require('underscore');

vows.describe('Grid').addBatch({
    'instanciates an empty grid' : {
        topic: new Grid(),
        'contains 81 elements' : function (topic) {
            assert.equal(topic._cells.length, 81); 
        },
        'each element is a Cell' : function (topic) {
            topic._cells.forEach(function (cell) {
                assert.instanceOf(cell, Cell);
            });
        }
    },
    'instanciates with not enough elements' : {
        topic: function () { return [1,2,3,4,5,6,7]; },
        'instanciation throws an exception' : function (topic) {
            assert.throws(function () {
                new Grid(topic);
            });
        }
    },
    'instanciates an invalid grid' : {
    	topic: function () {
    		return [
                1,2,3,4,5,6,7,8,9,
                2,3,4,5,6,7,8,9,1,
                3,4,5,6,7,8,9,1,2,
                4,5,6,7,8,9,1,2,3,
                5,6,7,8,9,1,2,3,4,
                6,7,8,9,1,2,3,4,5,
                7,8,9,1,2,3,4,5,6,
                8,9,1,2,3,4,5,6,7,
                9,1,2,3,4,5,6,7,8
            ];
    	},
    	'throws an exception' : function (topic) {
    		assert.throws(function () { new Grid(topic); });
    	}
    }, // Missing: instanciates with invalid elements (ie, values > 9)
    'correct instanciation' : {
        topic: function () {
            var grid = [
                1,2,3,4,5,6,7,8,9,
                4,5,6,7,8,9,1,2,3,
                7,8,9,1,2,3,4,5,6,
                2,3,4,5,6,7,8,9,1,
                5,6,7,8,9,1,2,3,4,
                8,9,1,2,3,4,5,6,7,
                3,4,5,6,7,8,9,1,2,
                6,7,8,9,1,2,3,4,5,
                9,1,2,3,4,5,6,7,8
            ];
            return grid;
        },
        'grid is initialized' : function (topic) {
            var g = new Grid(topic);
            g._cells.forEach(function (cell, index) {
                assert.equal(topic[index] + '', cell.toString());
            });
        }
    },
    'getting rows and cols of a grid' : {
        topic : function () {
            var grid = [
                1,2,3,4,5,6,7,8,9,
                4,5,6,7,8,9,1,2,3,
                7,8,9,1,2,3,4,5,6,
                2,3,4,5,6,7,8,9,1,
                5,6,7,8,9,1,2,3,4,
                8,9,1,2,3,4,5,6,7,
                3,4,5,6,7,8,9,1,2,
                6,7,8,9,1,2,3,4,5,
                9,1,2,3,4,5,6,7,8
            ];
            return new Grid(grid);
        },
        'Getting a valid row' : function (topic) {
            var row = topic.getRow(0);
            var stringRow = row.map(function (cell) { return cell.toString(); });
            assert.deepEqual(stringRow, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            
            var row = topic.getRow(2);
            var stringRow = row.map(function (cell) { return cell.toString(); });
            assert.deepEqual(stringRow, [7, 8, 9, 1, 2, 3, 4, 5, 6]);
        },
        'Trying to get an invalid row' : function (topic) {
            assert.throws(function () {topic.getRow(9);});
            assert.throws(function () {topic.getRow(12);});
        },
        'Getting a valid col' : function (topic) {
            var col = topic.getCol(0);
            var stringCol = col.map(function (cell) { return cell.toString(); });
            assert.deepEqual(stringCol, [1, 4, 7, 2, 5, 8, 3, 6, 9]);
            
            var col = topic.getCol(2);
            var stringCol = col.map(function (cell) { return cell.toString(); });
            assert.deepEqual(stringCol, [3, 6, 9, 4, 7, 1, 5, 8, 2]);
        },
        'Trying to get an invalid col' : function (topic) {
            assert.throws(function () {topic.getCol(9);});
            assert.throws(function () {topic.getCol(12);});
        }
    },
    'getting regions of a grid' : {
    	topic : function () {
    		return new Grid([
                 1,2,3,4,5,6,7,8,9,
                 4,5,6,7,8,9,1,2,3,
                 7,8,9,1,2,3,4,5,6,
                 2,3,4,5,6,7,8,9,1,
                 5,6,7,8,9,1,2,3,4,
                 8,9,1,2,3,4,5,6,7,
                 3,4,5,6,7,8,9,1,2,
                 6,7,8,9,1,2,3,4,5,
                 9,1,2,3,4,5,6,7,8
    		]);
    	},
    	'can get region 0' : function (topic) {
    		var region = topic.getRegion(0);
    		var expectedRegionValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    		for (var cell in region) {
    			assert.instanceOf(region[cell], Cell);
    			assert.deepEqual(region[cell].getValues(), [expectedRegionValues[cell]]);
    		}
    	},
    	'can get region 3' : function (topic) {
    		var expectedRegionValues = [2, 3, 4, 5, 6, 7, 8, 9, 1];
    		var region = topic.getRegion(3);
    		for (var cell in region) {
    			assert.instanceOf(region[cell], Cell);
    			assert.deepEqual(region[cell].getValues(), [expectedRegionValues[cell]]);
    		}
    	},
    	'can get region 8' : function (topic) {
    		var expectedRegionValues = [9, 1, 2, 3, 4, 5, 6, 7, 8];
    		var region = topic.getRegion(8);
    		for (var cell in region) {
    			assert.instanceOf(region[cell], Cell);
    			assert.deepEqual(region[cell].getValues(), [expectedRegionValues[cell]]);
    		}
    	}
    },
    'filling a grid' : {
    	topic: function () {
    		return [
                 0,0,0,4,5,6,7,0,9,
                 0,0,0,7,8,9,1,0,3,
                 0,0,0,1,2,3,4,0,0,
                 0,0,0,5,6,7,0,0,0,
                 5,0,7,8,9,1,0,0,0,
                 8,9,1,2,3,4,0,0,0,
                 3,4,5,6,7,8,0,0,0,
                 6,7,8,9,1,2,3,4,5,
                 0,0,0,3,4,5,0,7,8
    		];
    	},
    	'possible values are correct' : function (gridConf) {
    		var grid = new Grid(gridConf);
    		var cell = grid.getCell(1, 1);
    		assert.deepEqual(cell.getValues().length, 3);
    		assert.deepEqual(cell.getValues(), [2, 5, 6]);
    		var cell = grid.getCell(4, 6);
    		assert.deepEqual(cell.getValues().length, 2);
    		assert.deepEqual(cell.getValues(), [2, 6]);
    	},
    	'setting a cell updates the neighbours' : function (topic) {
    		var grid = new Grid(topic);
    		var updatedCell = grid.getCell(4, 6);
    		var neighbour41 = grid.getCell(4, 1);
    		var neighbour57 = grid.getCell(5, 7);
    		var neighbour86 = grid.getCell(8, 6);
    		assert.deepEqual(updatedCell.getValues(), [2, 6]);
    		assert.deepEqual(neighbour41.getValues(), [2, 3, 6]);
    		assert.deepEqual(neighbour57.getValues(), [5, 6]);
    		assert.deepEqual(neighbour86.getValues(), [2, 6, 9]);
    		updatedCell.setValue(2);
    		assert.deepEqual(updatedCell.getValues(), [2]);
    		assert.deepEqual(neighbour41.getValues(), [3, 6]);
    		assert.deepEqual(neighbour57.getValues(), [5, 6]);
    		assert.deepEqual(neighbour86.getValues(), [6, 9]);
    	},
    	'setting a cell to a wrong value throws an error' : function (topic) {
    		var grid = new Grid(topic);
    		var updatedCell = grid.getCell(4, 6);
    		assert.deepEqual(updatedCell.getValues(), [2, 6]);
    		assert.throws(function () { updatedCell.setValue(3);});
    	}
    },
    'validating a grid' : {
        topic: function () {
        	return Grid;
        },
        'returns true when the gris is filled' : function (topic) {
        	var grid = [
                1,2,3,4,5,6,7,8,9,
                4,5,6,7,8,9,1,2,3,
                7,8,9,1,2,3,4,5,6,
                2,3,4,5,6,7,8,9,1,
                5,6,7,8,9,1,2,3,4,
                8,9,1,2,3,4,5,6,7,
                3,4,5,6,7,8,9,1,2,
                6,7,8,9,1,2,3,4,5,
                9,1,2,3,4,5,6,7,8
            ];
        	var completeGrid = new topic(grid);
        	assert.ok(completeGrid.validate());
        },
        'returns false when empty' : function (topic) {
        	var grid = [
	            0,0,0,0,0,0,0,0,0,
	            0,0,0,0,0,0,0,0,0,
	            0,0,0,0,0,0,0,0,0,
	            0,0,0,0,0,0,0,0,0,
	            0,0,0,0,0,0,0,0,0,
	            0,0,0,0,0,0,0,0,0,
	            0,0,0,0,0,0,0,0,0,
	            0,0,0,0,0,0,0,0,0,
	            0,0,0,0,0,0,0,0,0
	        ];
	    	var completeGrid = new topic(grid);
	    	assert.ok(!completeGrid.validate());
	    }
    }
}).export(module);