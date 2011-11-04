var import = require('./lib/grid/import/string.js'),
	helper = require('./lib/helper.js'),
	Grid = require('./lib/grid.js');

var grid = 
	  ' , , ,3,7, , , ,2,'
	+ '2,3, , , , , , , ,'
	+ ' , ,9,2,4, , , , ,'
	+ ' ,5, , ,3, ,7,4,6,'
	+ '8,1, , ,6, , ,2,3,'
	+ '7,6,3, ,2, , ,5, ,'
	+ ' , , , ,9,2,5, , ,'
	+ ' , , , , , , ,7,8,'
	+ '1, , , ,8,4, , , ';
var consistentGrid = import(grid);

var _h = new helper(consistentGrid);

_h.on('done', function (err, finished, grid) {
	if (finished === true) {
		console.log('Done!');
	} else {
		console.log('More to go!');
	}
	console.log(grid.toString());
});

_h.run();
/**
var myGrid = new Grid(consistentGrid);
for (var i = 0; i < 81; i++) {
	var cell = myGrid.getCell(i),
		values = cell.getValues();
	if (values.length === 1) {
		cell.setValue(values[0]);
	}
} 

if (myGrid.validate()) {
	console.log('Done!');
} else {
	console.log('More to go!');
}
console.log(myGrid.toString());
**/