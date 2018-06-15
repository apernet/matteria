'use strict';

/**
 * @ngdoc filter
 * @name ideastechoApp.filter:filterMultiple
 * @function
 * @description
 * # filterMultiple
 * Filter in the ideastechoApp.
 */
angular.module('tcsGruntApp')
.filter('filterMultiple', function ($filter) {
    return function (items, keyObj) {
        var filterObj = {
            data: items,
            filteredData: [],
            applyFilter: function (obj, key) {
                var fData = [];
                if (this.filteredData.length == 0)
                    this.filteredData = this.data;
                if (obj) {
                    var fObj = {};
                    if (!angular.isArray(obj)) {
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData, fObj));
                    } else if (angular.isArray(obj)) {
                        if (obj.length > 0) {
                            for (var i = 0; i < obj.length; i++) {
                                if (angular.isDefined(obj[i])) {
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData, fObj));
                                }
                            }

                        }
                    }
                    //if(fData.length > 0){ // Para que regrese resultados solo si encuentra coincidencias con los filtros.
                    this.filteredData = fData;
                    //}
                }
            }
        };

        if (keyObj) {
            angular.forEach(keyObj, function (obj, key) {
                filterObj.applyFilter(obj, key);
            });
        }

        return filterObj.filteredData;
    }
})
.filter('unique', function () {
    return function (input, key) {
        var unique = {};
        var uniqueList = [];
        for (var i = 0; i < input.length; i++) {
            if (typeof unique[input[i][key]] == "undefined") {
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
})
.filter('ellipsis', function () {
    return function (text, length) {
        console.log(text);
        if (text.length > length) {
            return text.substr(0, length) + "...";
        }
        return text;
    }
});