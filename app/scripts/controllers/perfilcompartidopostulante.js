'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('PerfilCompartidoPostulanteCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', 'focus', '$stateParams', '$window', function ($scope, API_PATH_MEDIA, contenidoFactory, focus, $stateParams, $window) {

      $scope.tempProfesiones = [];
      $scope.tempIntereses = [];
      $scope.tempSectores = [];
      $scope.tempAreas = [];
      $scope.datosgenerales = [{}];
      $scope.user = {};
      $scope.paises = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.classazul = 'dp-btn-boton-interes-exp';
      $scope.classblanco = 'dp-btn-boton-interes-exp-sin';
      $scope.currentLocation = window.location.host;
      $scope.serviciocontratado = false;
      //console.log($window.localStorage.info_candidate);
      //if ($window.localStorage.info_candidate == 'true') {
      //    $scope.serviciocontratado = true;
      //}
      //else {
      //    $scope.serviciocontratado = false;
      //}
      
      candidato();

      //candidato
      function candidato() {
          contenidoFactory.ServiceContenido('candidates/' + $stateParams.id + '/', 'GET', '{}').then(function (data) {
              console.log(data);
              $scope.user = data.data;

              $scope.user.birthdays = new Date(data.birthday);
              $scope.slider = {
                  min: data.salary_min,
                  max: data.salary_max,
                  options: {
                      floor: 0,
                      ceil: data.salary_max + 500
                  }
              };

          });
      }


      //Paises
      contenidoFactory.ServiceContenido('catalogs/countries/?format=json', 'GET', '{}').then(function (data) {
          $scope.paises = data.data;

      });

      //causas
      contenidoFactory.ServiceContenido('catalogs/causes/?format=json', 'GET', '{}').then(function (data) {
          $scope.causas = data.data;

      });

      //disiplinas
      contenidoFactory.ServiceContenido('catalogs/careers/?format=json', 'GET', '{}').then(function (data) {
          $scope.disiplinas = data.data;

      });

      //idioma
      contenidoFactory.ServiceContenido('catalogs/languages/?format=json', 'GET', '{}').then(function (data) {
          $scope.idioma = data.data;

      });

      //profesiones
      contenidoFactory.ServiceContenido('catalogs/professions/?format=json', 'GET', '{}').then(function (data) {

          $scope.profesiones = data.data;
          $scope.tempData = [];

          for (var j = 0; j < $scope.user.professions.length; j++) {
              $scope.tempProfesiones.push($scope.user.professions[j].id);
              for (var i = 0; i < $scope.profesiones.length; i++) {

                  if ($scope.profesiones[i].id == $scope.user.professions[j].id) {
                      $scope.tempData.push($scope.profesiones[i]);

                      $scope.profesiones.splice(i, i + 1);
                  }

              }
          }

      });

      //intereses
      contenidoFactory.ServiceContenido('catalogs/interests/?format=json', 'GET', '{}').then(function (data) {
          $scope.intereses = data.data;
          $scope.tempDatainteres = [];

          for (var j = 0; j < $scope.user.interests.length; j++) {
              $scope.tempIntereses.push($scope.user.interests[j].id);
              for (var i = 0; i < $scope.intereses.length; i++) {

                  if ($scope.intereses[i].id == $scope.user.interests[j].id) {
                      $scope.tempDatainteres.push($scope.intereses[i]);

                      $scope.intereses.splice(i, i + 1);
                  }

              }
          }

      });

      //sector
      contenidoFactory.ServiceContenido('catalogs/exp-sectors/?format=json', 'GET', '{}').then(function (data) {
          $scope.sector = data.data;
          $scope.tempDataSector = [];

          for (var j = 0; j < $scope.user.exp_sectors.length; j++) {
              $scope.tempSectores.push($scope.user.exp_sectors[j].id);
              for (var i = 0; i < $scope.sector.length; i++) {

                  if ($scope.sector[i].id == $scope.user.exp_sectors[j].id) {
                      $scope.tempDataSector.push($scope.sector[i]);

                      $scope.sector.splice(i, i + 1);
                  }

              }
          }
      });

      //area
      contenidoFactory.ServiceContenido('catalogs/exp-areas/?format=json', 'GET', '{}').then(function (data) {
          $scope.area = data.data;
          $scope.tempDataArea = [];

          for (var j = 0; j < $scope.user.exp_areas.length; j++) {
              $scope.tempAreas.push($scope.user.exp_areas[j].id);
              for (var i = 0; i < $scope.area.length; i++) {

                  if ($scope.area[i].id == $scope.user.exp_areas[j].id) {
                      $scope.tempDataArea.push($scope.area[i]);

                      $scope.area.splice(i, i + 1);
                  }

              }
          }

      });


  }]);
