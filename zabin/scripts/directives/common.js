'use strict';

angular.module('app')

.directive('loged', function($localStorage) {
    return {
        link: function(scope, element, attrs) {
            if ($localStorage.token !== undefined) {
                element.removeClass('hidden');
            } else {
                element.addClass('hidden');
            }
        }
    }
})

.directive('notloged', function($localStorage) {
    return {
        link: function(scope, element, attrs) {
            if ($localStorage.token !== undefined) {
                element.addClass('hidden');
            } else {
                element.removeClass('hidden');
            }
        }
    }
})

.directive('fileReader', function() {
    return {
        scope: {
            fileReader: "="
        },
        link: function(scope, element) {
            $(element).on('change', function(changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    function CSVToArray(strData, strDelimiter) {
                        // Check to see if the delimiter is defined. If not,
                        // then default to comma.
                        strDelimiter = (strDelimiter || ",");

                        // Create a regular expression to parse the CSV values.
                        var objPattern = new RegExp(
                            (
                                // Delimiters.
                                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                                // Quoted fields.
                                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                                // Standard fields.
                                "([^\"\\" + strDelimiter + "\\r\\n]*))"
                            ),
                            "gi"
                        );


                        // Create an array to hold our data. Give the array
                        // a default empty first row.
                        var arrData = [
                            []
                        ];

                        // Create an array to hold our individual pattern
                        // matching groups.
                        var arrMatches = null;


                        // Keep looping over the regular expression matches
                        // until we can no longer find a match.
                        while (arrMatches = objPattern.exec(strData)) {

                            // Get the delimiter that was found.
                            var strMatchedDelimiter = arrMatches[1];

                            // Check to see if the given delimiter has a length
                            // (is not the start of string) and if it matches
                            // field delimiter. If id does not, then we know
                            // that this delimiter is a row delimiter.
                            if (
                                strMatchedDelimiter.length &&
                                strMatchedDelimiter !== strDelimiter
                            ) {

                                // Since we have reached a new row of data,
                                // add an empty row to our data array.
                                arrData.push([]);

                            }

                            var strMatchedValue;

                            // Now that we have our delimiter out of the way,
                            // let's check to see which kind of value we
                            // captured (quoted or unquoted).
                            if (arrMatches[2]) {

                                // We found a quoted value. When we capture
                                // this value, unescape any double quotes.
                                strMatchedValue = arrMatches[2].replace(
                                    new RegExp("\"\"", "g"),
                                    "\""
                                );

                            } else {

                                // We found a non-quoted value.
                                strMatchedValue = arrMatches[3];

                            }


                            // Now that we have our value string, let's add
                            // it to the data array.
                            arrData[arrData.length - 1].push(strMatchedValue);
                        }

                        // Return the parsed data.
                        return (arrData);
                    }

                    var r = new FileReader();
                    r.onload = function(e) {
                        var contents = e.target.result;

                        var csvArray = CSVToArray(contents, ",");
                        var h = csvArray[0];
                        var result = [];
                        for (var i in csvArray) {
                            if (i == 0) continue;
                            var obj = {};
                            if (csvArray[i].length != h.length) continue;
                            for (var j in csvArray[i]) {
                                obj[h[j]] = csvArray[i][j];
                            }
                            result.push(obj)
                        }
                        // var result = [];
                        // var a = contents.split(/\n/);
                        // if (a.length > 1) {
                        //     var header = a[0].split(",");
                        //     for (var i = 1; i < a.length; i++) {
                        //         var body = a[i].split(",");
                        //         var obj = {};
                        //         for (var j = 0; j < header.length; j++) {
                        //             var h = header[j];
                        //             obj[h] = body[j];
                        //         }
                        //         result.push(obj);
                        //     }
                        //     console.log(result);
                        // }

                        scope.$apply(function() {
                            scope.fileReader = result;
                        });
                    };

                    r.readAsText(files[0]);
                }
            });
        }
    };
});
