var fs = require('fs');
var _ = require('lodash');

var testJSONContent = fs.readFileSync('test.json', 'utf8');
var testJSON = JSON.parse(testJSONContent);

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var rootInterface = {};
var listOfInterface = {};

function loopParseJson (jsonObj, parent) {

    if (typeof jsonObj === 'object') {
        _.forEach(jsonObj, function(value, key) {
            // if only have string or number left.
            if (typeof value !== 'object') {
                rootInterface[key] = typeof value;

                // fill interface children with typeings
                if (parent) {
                    if (listOfInterface[parent + '_Interface']) {
                        listOfInterface[parent + '_Interface'][key] = typeof value;
                    }
                }

                // if is sub interface
            } else if (typeof value === 'object') {

                // generate new parent for more sub interface
                if (parent) {
                    var newParent = parent + key.capitalizeFirstLetter();
                } else {
                    var newParent = key.capitalizeFirstLetter();
                }

                // save into list of interface
                if (parent) {
                    // console.log(key, parent + key.capitalizeFirstLetter() + '_Interface');
                    var newKey = parent + key.capitalizeFirstLetter() + '_Interface';
                    var arrayOfChildKeys = _.keys(value);
                    var newChildObj = {}
                    arrayOfChildKeys.forEach(function (key) {
                        newChildObj[key] = ''
                    });
                    listOfInterface[newKey] = newChildObj;

                    // fill parent's interface
                    listOfInterface[parent + '_Interface'][key] = parent + key.capitalizeFirstLetter() + '_Interface';

                } else {
                    // console.log(key, key.capitalizeFirstLetter() + '_Interface');
                    var newKey = key.capitalizeFirstLetter() + '_Interface';
                    var arrayOfChildKeys = _.keys(value);
                    var newChildObj = {}
                    arrayOfChildKeys.forEach(function (key) {
                        newChildObj[key] = ''
                    });

                    rootInterface[key] = key.capitalizeFirstLetter() + '_Interface';
                    listOfInterface[newKey] = newChildObj;
                }

            }
            loopParseJson(value, newParent);
        });
    }
}

loopParseJson(testJSON, null);
console.log(rootInterface);
console.log(listOfInterface);


// export Interface name {
//     child
// }

function writeInterfaceFile () {
    // root interface
    var exportRootName = 'RootInterface'
    var exportNameString = 'export interface ';
    var exportFileString = '';
    exportFileString = exportFileString + exportNameString + exportRootName + ' {' + '\r\n';
    _.forEach(rootInterface, function (value, key) {
        exportFileString = exportFileString + '    ' + key + ': ' + value + ';\r\n';
    });

    exportFileString = exportFileString + '}' + '\r\n';

    // list of interface
    _.forEach(listOfInterface, function (value, key) {
        var exportInterfaceName = key;
        var exportInterfaceString = exportNameString + exportInterfaceName + ' {' + '\r\n';
        _.forEach(value, function (value, key) {
            exportInterfaceString = exportInterfaceString + '    ' + key + ': ' + value + ';\r\n';
        })
        exportInterfaceString = exportInterfaceString + '}\r\n';

        exportFileString = exportFileString + exportInterfaceString;
    });


    console.log(exportFileString);
    fs.writeFileSync('dest/output.ts', exportFileString , null, 4);
}

writeInterfaceFile();



// fs.writeFileSync('dest/output.json', JSON.stringify(listOfInterface, null, 4));
