'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('ConfiguracionOrganizacionCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', '$mdToast', function ($scope, API_PATH_MEDIA, contenidoFactory, $window, $mdToast) {

  
      $scope.configuracion = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      //$scope.configuracion.ofertatrabajo = 
      //$scope.configuracion
      //$scope.configuracion

      //Notificaciones
      $scope.guardarNotificaciones = function () {
          
          contenidoFactory.ServicePerfil('companies/' + $window.localStorage.id_company + '/mail-settings/edit/', 'PUT', {

              "mail_new_candidates": $scope.configuracion.mail_new_candidates,
              "mail_openings_ending": $scope.configuracion.mail_openings_ending,
              "mail_site_improvements": $scope.configuracion.mail_site_improvements,
              "mail_updates_news_matteria": $scope.configuracion.mail_updates_news_matteria
          }).then(function (data) {
              //$scope.configuracion = data
              console.log(data);
          });
      }

      $scope.cambiarPasword = function (ev) {
          if ($scope.configuracion.password === $scope.configuracion.password1) {
              contenidoFactory.ServicePerfil('users/password/edit/', 'PUT', {
                  "oldPassword": $scope.configuracion.oldPassword,
                  "password": $scope.configuracion.password
              }).then(function (data) {
                  contenidoFactory.mensaje(ev, data.response);
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
                  $window.localStorage.role = "";
                  $window.localStorage.token = "";
                  $window.localStorage.avatar = "";
                  $window.localStorage.nombre = "";
                  $window.localStorage.id_user = "";
                  $window.localStorage.id_company = "";
              });
          });
      }

      $scope.cambiarresponsable = function (ev) {
          contenidoFactory.ServicePerfil('companies/' + $window.localStorage.id_company + '/contact-info/edit/', 'PUT', {
              "contact_name": $scope.responsable.contact_name,
              "contact_phone_number": $scope.responsable.contact_phone_number,
              "contact_cellphone_number": $scope.responsable.contact_cellphone_number,
              "contact_email": $scope.responsable.contact_email
          }).then(function (data) {
              //$mdToast.show($mdToast.simple().content("Datos actualizados correctamente").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
              contenidoFactory.mensaje(ev, "Datos actualizados correctamente");
          });
      }

      contenidoFactory.ServicePerfil('companies/' + $window.localStorage.id_company + '/mail-settings/?format=json', 'GET', '{}').then(function (data) {
          console.log(data)
          $scope.configuracion = data
      });

      contenidoFactory.ServicePerfil('companies/' + $window.localStorage.id_company + '/contact-info/?format=json', 'GET', '{}').then(function (data) {
          console.log(data)
          $scope.responsable = data
      });

      
  }]);
