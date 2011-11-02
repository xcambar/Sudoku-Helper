var vows = require('vows'),
    Grid = require('../../../lib/grid.js'),
    StringImport = require('../../../lib/grid/import/string.js'),
    assert = require('assert');

vows.describe('Grid String Import').addBatch({
    'invalid import' : {
        topic: function () {
        	return StringImport;
        },
        'has no parameter' : function (topic) {
            assert.throws(function () { topic(); }); 
        },
        'contains less than 81 elements' : function (topic) {
            assert.throws(function () { topic('1,2,3'); }); 
        }
    },
    'correct import without empty values' : {
    	topic: function () {
    		return '1, 2, 3, 4, 5, 6, 7, 8, 9,' +
	        '4, 5, 6, 7, 8, 9, 1, 2, 3,' +
	        '7, 8, 9, 1, 2, 3, 4, 5, 6,' +
	        '2, 3, 4, 5, 6, 7, 8, 9, 1,' +
	        '5, 6, 7, 8, 9, 1, 2, 3, 4,' +
	        '8, 9, 1, 2, 3, 4, 5, 6, 7,' +
	        '3, 4, 5, 6, 7, 8, 9, 1, 2,' +
	        '6, 7, 8, 9, 1, 2, 3, 4, 5,' +
	        '9, 1, 2, 3, 4, 5, 6, 7, 8';
    	},
        'returns a valid array' : function (topic) {
        	var expected = [
    	        1, 2, 3, 4, 5, 6, 7, 8, 9,
    	        4, 5, 6, 7, 8, 9, 1, 2, 3,
    	        7, 8, 9, 1, 2, 3, 4, 5, 6,
    	        2, 3, 4, 5, 6, 7, 8, 9, 1,
    	        5, 6, 7, 8, 9, 1, 2, 3, 4,
    	        8, 9, 1, 2, 3, 4, 5, 6, 7,
    	        3, 4, 5, 6, 7, 8, 9, 1, 2,
    	        6, 7, 8, 9, 1, 2, 3, 4, 5,
    	        9, 1, 2, 3, 4, 5, 6, 7, 8
            ];
        	assert.deepEqual(StringImport(topic), expected);
        }
    },
    'correct import with empty values' : {
    	topic: function () {
    		return '0, 2, 3, 4, 5, 6, 7, 8, 9,' + //Explicit 0
	        '4, 5, 6, 7, 8, 9, 1, 2, 3,' +
	        '7, 8, 9, 1, 2, 3, 4, 5, 6,' +
	        '2, 3, 4, 5, 6, 7, 8, 9, 1,' +
	        '5, 6, 7, 8, 9, 1, 2, 3, 4,' +
	        '8, 9, 1, 2, 3, 4, 5, 6, 7,' +
	        '3, 4, 5, 6, 7, 8, 9, 1, 2,' +
	        '6, 7, 8, 9, 1, 2, 3,, 5,' +   // Empty value
	        '9, 1, 2, 3, 4, 5, 6, 7, ';    // Empty Value
    	},
        'returns a valid array' : function (topic) {
        	var expected = [
    	        null, 2, 3, 4, 5, 6, 7, 8, 9,
    	        4, 5, 6, 7, 8, 9, 1, 2, 3,
    	        7, 8, 9, 1, 2, 3, 4, 5, 6,
    	        2, 3, 4, 5, 6, 7, 8, 9, 1,
    	        5, 6, 7, 8, 9, 1, 2, 3, 4,
    	        8, 9, 1, 2, 3, 4, 5, 6, 7,
    	        3, 4, 5, 6, 7, 8, 9, 1, 2,
    	        6, 7, 8, 9, 1, 2, 3, null, 5,
    	        9, 1, 2, 3, 4, 5, 6, 7, null
            ];
        	assert.deepEqual(StringImport(topic), expected);
        }
    }
}).export(module);