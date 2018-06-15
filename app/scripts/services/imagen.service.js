'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .factory('Images', ['$http', '$q', 'API_PATH', '$resource', '$window', function ($http, $q, API_PATH, $resource, $window) {
      return {
          setImagenPostulante: function (_IMAGEN) {
              var _defer = $q.defer();
              $http({
                  url: API_PATH + 'candidates/' + $window.localStorage.id_candidate + '/edit/avatar/',
                  method: 'PUT', //Puede ser GET, POST, HEAD, OPTIONS.
                  data: _IMAGEN,
                  transformRequest: angular.identity,
                  headers: {
                      'Authorization': 'JWT ' + $window.localStorage.token,
                      'Content-Type': undefined
                  }
              }).then(
              function (data) {
                  _defer.resolve(data.data);
              },
              function (e) {
                  console.log(e);
                  _defer.reject();
              });

              return _defer.promise;
          },

          setImagenOrganizacion: function (_IMAGEN) {
              var _defer = $q.defer();
              $http({ 
                  url: API_PATH + 'companies/' + $window.localStorage.id_company + '/edit/logo/',
                  method: 'PUT', //Puede ser GET, POST, HEAD, OPTIONS.
                  data: _IMAGEN,
                  transformRequest: angular.identity,
                  headers: {
                      'Authorization': 'JWT ' + $window.localStorage.token,
                      'Content-Type': undefined
                  }
              }).then(
              function (data) {
                  _defer.resolve(data.data);
              },
              function (e) {
                  console.log(e);
                  _defer.reject();
              });

              return _defer.promise;
          }
      }
  	
  }]);

