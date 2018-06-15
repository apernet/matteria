'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('ConfiguracionPostulanteCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', '$mdToast', '$mdDialog', function ($scope, API_PATH_MEDIA, contenidoFactory, $window, $mdToast, $mdDialog) {

  
      $scope.configuracion = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      //$scope.configuracion.ofertatrabajo = 
      //$scope.configuracion
      //$scope.configuracion

      //Notificaciones
      $scope.guardarNotificaciones = function () {
          console.log($scope.configuracion);
          
          contenidoFactory.ServicePerfil('candidates/' + $window.localStorage.id_candidate + '/mail-settings/edit/', 'PUT', {
              "mail_job_offers": $scope.configuracion.mail_job_offers,
              "mail_site_improvements": $scope.configuracion.mail_site_improvements,
              "mail_updates_news_matteria": $scope.configuracion.mail_updates_news_matteria
          }).then(function (data) {
              //$scope.configuracion = data
              console.log(data);
          });
      }

      $scope.cambiarPasword = function(ev)
      {
          if ($scope.configuracion.password === $scope.configuracion.password1) {
              contenidoFactory.ServicePerfil('users/password/edit/', 'PUT', {
                  "oldPassword": $scope.configuracion.oldPassword,
                  "password": $scope.configuracion.password
              }).then(function (data) {
                  if (data.response != undefined) {
                      contenidoFactory.mensaje(ev, data.response);
                  }
                  //$mdToast.show($mdToast.simple().content(data.response).parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
              });
          }
          else {
              contenidoFactory.mensaje(ev, "Los password no son iguales");
              //$mdToast.show($mdToast.simple().content("Los password no son iguales").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
          }
      }

      $scope.desactivar = function (ev) {
          var confirm = $mdDialog.confirm()
                .title('Desactivar cuenta?')
                .textContent('Estas seguro que deseas desactivar esta cueta.')
                .ariaLabel('')
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');

          $mdDialog.show(confirm).then(function () {
              contenidoFactory.ServicePerfil('users/deactivate/', 'PUT', {
              }).then(function (data) {
                  console.log(data);
                  $window.location.assign('/ingresa');
                  $window.localStorage.role = "";
                  $window.localStorage.token = "";
                  $window.localStorage.avatar = "";
                  $window.localStorage.nombre = "";
                  $window.localStorage.id_user = "";
                  $window.localStorage.id_candidate = "";
              });
          });
      }

      contenidoFactory.ServicePerfil('candidates/' + $window.localStorage.id_candidate + '/mail-settings/?format=json', 'GET', '{}').then(function (data) {
          console.log(data)
          $scope.configuracion = data
      });

  }]);
