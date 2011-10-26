var vows = require('vows'),
    Grid = require('../../../lib/grid.js'),
    StringImport = require('../../../lib/grid/import/string.js'),
    assert = require('assert');

vows.describe('Grid String Import').addBatch({
    'invalid import' : {
        topic: function () {return StringImport;},
        'has no parameter' : function (topic) {
            assert.throws(function () { new topic(); }); 
        },
        'contains less than 81 elements' : function (topic) {
            assert.throws(function () { new topic('1,2,3'); }); 
        }
    }
}).export(module);