'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('MisVacanteCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', '$location', '$mdDialog', '$mdSidenav', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window, $location, $mdDialog, $mdSidenav) {

      $scope.rankingmodel = "";
      $scope.vacantes = [{}];
      $scope.postulantes = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
        
      vervacantes();

      $scope.url = function (id) {
          console.log(id);
          $location.url('/viewoferta/' + id);
      }

      $scope.url_detalle = function (id) {
          console.log(id);
          $location.url('/vacante/' + id);
      }

      $scope.urlPostulantes = function (id) {
          console.log(id);
          $location.url('/verpostulantes/' + id);
      }

      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
          return function () {
              $mdSidenav(componentId).toggle();
          };
      }

      $scope.caducar = function (id, ev) {
          var confirm = $mdDialog.confirm({
              targetEvent: ev,
              template: '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
                        '<md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
                        '<div class="md-dialog-content-body"><h4 class="negrita">¿Estás seguro de caducar la vacante? </h4></div>' +
                        '</md-dialog-content>' +
                        '<md-dialog-actions>' +
                        '<md-button ng-click="dialog.hide()" class="md-primary md-confirm-button">Si</md-button>' +
                        '<md-button ng-click="dialog.abort()" class="md-primary md-cancel-button">No</md-button>' +
                        '</md-dialog-actions>' +
                        '</md-dialog>'
          })
                //.title('Caducar vacante?')
                //.textContent('Estas seguro que deseas caducar la vacante.')
                //.ariaLabel('')
                //.targetEvent(ev)
                //.ok('Si')
                //.cancel('No');

          $mdDialog.show(confirm).then(function () {
              contenidoFactory.ServiceContenido('openings/' + id + '/edit-status/', 'PUT', {
                  "status_opening": 'expired'
              }).then(function (data) {
                  contenidoFactory.ServiceContenido('companies/' + $window.localStorage.id_company + '/openings/?format=json', 'GET', '{}').then(function (data) {
                      $scope.vacantes = data.data;
                  });
                  
              });
          });          
      }

      //Vacante
      function vervacantes() {
          contenidoFactory.ServiceContenido('companies/' + $window.localStorage.id_company + '/openings/?format=json', 'GET', '{}').then(function (data) {
              console.log(data.data);
              $scope.vacantes = data.data;
              //var _expired = "";
              //var _draft = "";
              //for (var i = 0; i < data.data.length; i++) {
              //    if (data.data[i].expired == true) {
              //        _expired = 1;
              //    }
              //    else {
              //        _expired = 0;
              //    }
              //    if (data.data[i].draft == true) {
              //        _draft = 2;
              //    }
              //    else {
              //        _draft = 3;
              //    }
              //    $scope.vacantes.push({
              //        id: data.data[i].id,
              //        name: data.data[i].name,
              //        keep_company_alias: data.data[i].keep_company_alias,
              //        expired: _expired,
              //        draft: _draft,
              //        professions: data.data[i].professions,
              //        years_experience: data.data[i].years_experience,
              //        city: data.data[i].city,
              //        country: data.data[i].country,
              //        open_opening: data.data[i].open_opening,
              //        close_opening: data.data[i].close_opening,
              //        company: data.data[i].company,
              //        alternate_company_alias: data.data[i].alternate_company_alias,
              //        activities: data.data[i].activities
              //    });

              //}
          });
      }

      //console.log($scope.caducagmodel);
      //console.log($scope.rankingmodel);

      $scope.selectdraft = function () {
          $scope.caducagmodel = undefined
      }

      $scope.selectexpired = function () {
          $scope.rankingmodel = undefined
      }

  }]);
