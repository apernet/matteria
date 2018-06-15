'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('MisPostulacionesCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', '$location', '$mdDialog', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window, $location, $mdDialog) {

      $scope.rankingmodel = "";
      $scope.vacantes = [{}];
      $scope.postulantes = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;

      $scope.urlPostulantes = function (id) {
          console.log(id);
          $location.url('/vacante/' + id);
      }

      //Vacante
      contenidoFactory.ServicePerfil('candidates/me/applications/?format=json', 'GET', '{}').then(function (data) {
          console.log(data);
          $scope.vacantes = data
      });

      //Delet postulacion
      $scope.deletepostulacion = function (id, ev) {

          var confirm = $mdDialog.confirm({
              targetEvent: ev,
              template: '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
                        '<md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
                        '<div class="md-dialog-content-body"><h4 class="negrita">¿Estás seguro que deseas anular tu postulación a esta vacante?</h4></div>' +
                        '</md-dialog-content>' +
                        '<md-dialog-actions>' +
                        '<md-button ng-click="dialog.hide()" class="md-primary md-confirm-button">Si</md-button>' +
                        '<md-button ng-click="dialog.abort()" class="md-primary md-cancel-button">No</md-button>' +
                        '</md-dialog-actions>' +
                        '</md-dialog>'
          })
                //.title('Anular postulación?')
                //.textContent('Estas seguro que deseas anular la postulación.')
                //.ariaLabel('')
                //.targetEvent(ev)
                //.ok('Si')
                //.cancel('No');

          $mdDialog.show(confirm).then(function () {
              contenidoFactory.ServiceContenido('openings/applications/' + id + '/delete/', 'DELETE', '{}').then(function (data) {

                  contenidoFactory.ServicePerfil('candidates/me/applications/?format=json', 'GET', '{}').then(function (data) {

                      $scope.vacantes = data
                  });
              });
          });         
      }
  }]);
