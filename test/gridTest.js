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
            })
        }
    },
    'instanciates with not enough elements' : {
        topic: function () { return [1,2,3,4,5,6,7]; },
        'instanciation throws an exception' : function (topic) {
            assert.throws(function () {
                new Grid(topic);
            });
        }
    }, // Missing: instanciates with invalid elements (ie, values > 9)
    'correct instanciation' : {
        topic: function () {
            var grid = [];
            for (var i = 0; i < 81; i++) {
                grid.push((Math.floor(i/9) + (i % 9)) % 9 + 1);
            }
            return grid;
        },
        'grid is initialized' : function (topic) {
            var g = new Grid(topic);
            g._cells.forEach(function (cell, index) {
                assert.equal(topic[index] + '', cell.toString());
            });
        }
    },
    'getting parts of a grid' : {
        topic : function () {
            var grid = [];
            for (var i = 0; i < 81; i++) {
                grid.push((Math.floor(i/9) + (i % 9)) % 9 + 1);
            }
            return new Grid(grid);
        },
        'Getting a valid row' : function (topic) {
            var row = topic.getRow(0);
            var stringRow = row.map(function (cell) { return cell.toString(); }).toString();
            assert.equal(stringRow, _.range(1, 10).toString());
            
            var row = topic.getRow(2);
            var stringRow = row.map(function (cell) { return cell.toString(); }).toString();
            assert.equal(stringRow, _.range(1, 10).map(function (v) { return (v + 1) % 9 + 1; }));
        },
        'Trying to get an invalid row' : function (topic) {
            assert.throws(function () {topic.getRow(9)});
            assert.throws(function () {topic.getRow(12)});
        },
        'Getting a valid col' : function (topic) {
            var col = topic.getCol(0);
            var stringCol = col.map(function (cell) { return cell.toString(); }).toString();
            assert.equal(stringCol, _.range(1, 10).toString());
            
            var col = topic.getCol(2);
            var stringCol = col.map(function (cell) { return cell.toString(); }).toString();
            assert.equal(stringCol, _.range(1, 10).map(function (v) { return (v + 1) % 9 + 1; }));
        },
        'Trying to get an invalid col' : function (topic) {
            assert.throws(function () {topic.getCol(9)});
            assert.throws(function () {topic.getCol(12)});
        }
    }
}).export(module);