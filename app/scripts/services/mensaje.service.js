'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .factory('mensajeFactory', ['$http', '$mdDialog', function ($http, $mdDialog) {

      function ventana($scope) {
          $scope.hide = function () {
              $mdDialog.hide();
          };

          $scope.cancel = function () {
              $mdDialog.cancel();
          };

          $scope.getsalario = function () {
              //contenidoFactory.ServicePerfil('openings/applications/create/', 'POST', {
              //    "candidate": $window.localStorage.id_candidate,
              //    "opening": $stateParams.id,
              //    "salary_min": $scope.rango.filterdesde,
              //    "salary_max": $scope.rango.filterhasta
              //}).then(function (data) {
              //    $window.location.href = "/postulacionrecibida";
              //});
          };
      }

      return {
          mensaje_salario: function (ev) {

              var confirm = $mdDialog.confirm(
                     {
                         targetEvent: ev,
                         controller: ventana,
                         template: '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
                                   '<md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
                                   '<h2 class="md-title negrita">¿Cuál es tu expectativa salarial?</h2>' +
                                   '<div class="md-dialog-content-body">' +
                                   '<md-input-container class="md-block" style="margin-bottom:5px">' +
                                           '<label>Rango Salarial (USD): </label>' +
                                       '</md-input-container>' +
                                       '</br>' +
                                       '<div layout-gt-sm="row">' +
                                           '<md-input-container class="md-block" flex-gt-sm>' +
                                               '<label>Desde</label>' +
                                               '<input name="Nombre" ng-model="rango.filterdesde">' +
                                           '</md-input-container>' +

                                           '<md-input-container class="md-block" flex-gt-sm>' +
                                               '<label>Hasta</label>' +
                                               '<input name="Nombre" ng-model="rango.filterhasta">' +
                                           '</md-input-container>' +
                                       '</div>' +
                                   '</div>' +
                                   '</md-dialog-content>' +
                                   '<md-dialog-actions>' +
                                   '<md-button ng-click="getsalario()" class="md-primary md-confirm-button">Enviar</md-button>' +
                                   '<md-button ng-click="cancel()" class="md-primary md-cancel-button">Cancelar</md-button>' +
                                   '</md-dialog-actions>' +
                                   '</md-dialog>'

                     });

              $mdDialog.show(confirm).then(function () {
                  console.log("OK-3");
              });
          }
      }
  }])

