'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .factory('contenidoFactory', ['$http', '$q', 'API_PATH', '$resource', '$window', '$mdDialog', function ($http, $q, API_PATH, $resource, $window, $mdDialog) {
     
      return {
          ServiceContenido: function (URL, tipo, parametros) {
              var _defer = $q.defer();

              $http({
                  url: API_PATH + URL,
                  method: tipo,
                  data: parametros,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json"
              }).then(function successCallback(response) {
                  _defer.resolve(response);
              }, function errorCallback(response) {
                  _defer.resolve(response);
              });

              return _defer.promise;
          },

          ServicePerfil: function (URL, tipo, parametros) {
              //console.log($window.localStorage.token);
              var _defer = $q.defer();
              $http({
                  url: API_PATH + URL,
                  method: tipo, //Puede ser GET, POST, HEAD, OPTIONS.
                  data: parametros,
                  headers: {
                      'Authorization': 'JWT ' + $window.localStorage.token,
                      'Content-Type': 'application/json'
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

          login: function (_email, _pass, _url) {
              var _defer = $q.defer();
              $http({
                  url: API_PATH + _url,
                  method: 'POST',
                  data: {
                      email: _email,
                      password: _pass
                  },
                  contentType: 'application/json; charset=utf-8',
                  dataType: 'json'
              }).then(function successCallback(data) {
                  //console.log(data.data);
                  _defer.resolve(data.data);
              }).then(function successCallback(e) {
                  _defer.reject(e);
              });

              return _defer.promise;
          },

          session: function () {
              if ($window.localStorage.token) {
                  return true;
              }
              return false;
          },

          token: function () {
              if ($window.localStorage.token) {
                  return $window.localStorage.token;
              }
              return '';
          },

          role: function () {
              if ($window.localStorage.role) {
                  return $window.localStorage.role;
              }
              return null;
          },

          mensaje: function (ev, contenido) {             

              $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .textContent(contenido)
                    .ariaLabel('Mensajes')
                    .ok('Aceptar')
                    .targetEvent(ev)
                );
          }
          
      }
  }])
 .factory('focus', function ($timeout, $window) {
     return function (id) {         
         // timeout makes sure that it is invoked after any other event has been triggered.
         // e.g. click events that need to run before the focus or
         // inputs elements that are in a disabled state but are enabled when those events
         // are triggered.
         $timeout(function () {
             var element = $window.document.getElementById(id);
             if (element)
                 element.focus();
         });
     };
 });

