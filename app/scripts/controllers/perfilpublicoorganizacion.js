'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('PerfilPublicoOrganizacionesCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window) {

      $scope.datosgenerales = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.currentLocation = window.location.host;

      compania();
      function compania() {
          contenidoFactory.ServiceContenido('companies/' + +$stateParams.id + '/', 'GET', '{}').then(function (data) {
              $scope.company = data.data;
              console.log($scope.company);
          });
      }

      //Paises
      contenidoFactory.ServiceContenido('catalogs/countries/?format=json', 'GET', '{}').then(function (data) {
          $scope.paises = data.data;

      });

      //Tipo
      contenidoFactory.ServiceContenido('catalogs/company-types/?format=json', 'GET', '{}').then(function (data) {
          $scope.tipos = data.data;

      });

  }]);