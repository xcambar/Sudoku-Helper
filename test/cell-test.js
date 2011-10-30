var vows = require('vows'),
    assert = require('assert');
    Cell = require('../lib/cell.js');

vows.describe('Cell').addBatch({
    'instanciating an empty cell': {
        topic: new Cell(),
        'can be of any value': function (topic) {
            assert.equal(topic._value, 511);
        },
        'which is shown explicitly by toString': function (topic) {
            assert.equal(topic.toString(), '1,2,3,4,5,6,7,8,9');
        }
    },
    'instanciating explicitly with 0 value' : {
        topic: new Cell(0),
        'can be of any value': function (topic) {
            assert.equal(topic._value, 511);
        },
        'which is shown explicitly by toString': function (topic) {
            assert.equal(topic.toString(), '1,2,3,4,5,6,7,8,9');
        }
    },
    'instanciating a cell with a default value': {
        topic: new Cell(5),
        'has the correct integer value': function (topic) {
            assert.equal(topic._value, Math.pow(2,5-1));
        },
        'returns a string containing the value' : function (topic) {
            assert.equal(topic.toString(), '5');
        }
    },
    'updating a cell' : { //Missing tests with setting or removing the value 0
        topic: function () { return Cell; },
        'a value can be removed from the cell' : function (topic) {
            var topic = new topic();
            topic.removePossibleValue(3);
            assert.equal(topic.toString(), '1,2,4,5,6,7,8,9');
        },
        'a value can be added to the cell' : function (topic) {
            var topic = new topic(4);
            topic.addPossibleValue(3);
            assert.equal(topic.toString(), '3,4');
        },
        'a value that is already available can be safely added twice' : function (topic) {
            var topic1 = new topic();
            topic1.addPossibleValue(3);
            assert.equal(topic1.toString(), '1,2,3,4,5,6,7,8,9');
            var topic2 = new topic(4);
            topic2.addPossibleValue(4);
            assert.equal(topic2.toString(), '4');
        },
        'a value that is not available can be safely removed' : function (topic) {
            var topic1 = new topic();
            topic1.removePossibleValue(3);
            topic1.removePossibleValue(3);
            assert.equal(topic1.toString(), '1,2,4,5,6,7,8,9');
            var topic2 = new topic(3);
            topic2.removePossibleValue(3);
            topic2.removePossibleValue(3);
            assert.equal(topic2.toString(), '');
        },
        'setting a definitive value removes all possible values' : {
        	topic : function (topic) {
        		var cell = new topic([1,3,5,7]);
        		cell.on('value', this.callback);
        		cell.setValue(4);
        	},
        	'all other values have been removed' : function (err, value) {
        		assert.deepEqual(err, null);
                assert.equal(value, 1 << (4 - 1));
            }
        }
    }
}).export(module);
