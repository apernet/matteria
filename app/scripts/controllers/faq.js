'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
    .controller('FaqCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', 'filterFilter', '$window', function ($scope, API_PATH_MEDIA, contenidoFactory, filterFilter, $window) {

      $scope.candidatos = [{}];
      $scope.organizaciones = [{}];
      $scope.faq = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.idiomaLocal = $window.localStorage.idioma;

      $scope.calcular = function () {

        if ($window.localStorage.idioma == 'es_MX') {
          $scope.idiomaLocal = 'es_MX';
        }
        else {
          if ($window.localStorage.idioma == 'en_EN') {
            $scope.idiomaLocal = 'en_EN';
          }
          else {
            if ($window.localStorage.idioma == 'pt_BR') {
              $scope.idiomaLocal = 'pt_BR';
            }
          }
        }
      }

      //$scope.calcular = function () {

      //    if ($window.localStorage.idioma == 'es_MX') {
      //        $scope.idiomaLocal = 'es_MX';
      //    }
      //    else {
      //        $scope.idiomaLocal = 'en_EN';
      //    }
      //    //$scope.matteria = $scope.matteria;

      //}

      $scope.$watch($scope.calcular);

      //faq
      contenidoFactory.ServiceContenido('fcm/faq/', 'GET', '{}').then(function (data) {
          
          for (var x = 0; x < data.data.length; x++) {
              if (data.data[x].categoria == "Candidatos") {
                  console.log(data.data[x]);
                  $scope.candidatos.push(data.data[x]);
              }
              else {
                  $scope.organizaciones.push(data.data[x]);
              }
          }

          $scope.candidatos.splice(0, 1);
          $scope.organizaciones.splice(0, 1);
      });
  }]);
