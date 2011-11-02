var _ = require('underscore');

var StringGridImport = function (str) {
    if ((typeof(str) !== 'string') && !(str instanceof String)) {
        throw new Error('Invalid parameter');
    }
    var splitStr = str.split(',');
    if (splitStr.length !== 81) {
        throw new Error('Invalid import');
    }
    
    var consistentArray = _.map(splitStr, function (value) {
    	var parsedValue = parseInt(value.trim(), 10);
    	return !!parsedValue ? parsedValue : null;
    });
    return consistentArray;
};

module.exports = StringGridImport;