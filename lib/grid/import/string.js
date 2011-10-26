var StringGridImport = function (str) {
    if (!((typeof(str) === 'string') || (str instanceof String))) {
        console.log(str);
        throw new Error('Invalid parameter');
    }
    var splitStr = str.split(',');
    if (splitStr.length !== 81) {
        throw new Error('Invalid import');
    }
};

module.exports = StringGridImport;