'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('ViewOfertasCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window) {

      $scope.professions = [];
      $scope.tempProfesiones = [];
      $scope.tempIntereses = [];
      $scope.vacante = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;

      //vacantes detalle
      contenidoFactory.ServiceContenido('openings/' + $stateParams.id + '/?format=json', 'GET', '{}').then(function (data) {
          
          $scope.oferta = data.data

          console.log($scope.oferta.opening_type.id);
          //Profesiones 
          for (var j = 0; j < $scope.oferta.professions.length; j++) {
              $scope.tempProfesiones.push($scope.oferta.professions[j].id);
          }

          //Intereses
          for (var j = 0; j < $scope.oferta.interests.length; j++) {
              $scope.tempIntereses.push($scope.oferta.interests[j].id);
          }
          contenidoFactory.ServiceContenido('catalogs/interests/?format=json', 'GET', '{}').then(function (data) {
              $scope.intereses = data.data;
              $scope.tempDatainteres = [];

              for (var j = 0; j < $scope.oferta.interests.length; j++) {
                  //$scope.tempIntereses.push($scope.user.interests[j].id);
                  for (var i = 0; i < $scope.intereses.length; i++) {

                      if ($scope.intereses[i].id == $scope.oferta.interests[j].id) {
                          $scope.tempDatainteres.push($scope.intereses[i]);

                          $scope.intereses.splice(i, 1);
                      }

                  }
              }
          });
      });

      //Tipo de vacantes
      contenidoFactory.ServiceContenido('catalogs/company-services/?format=json', 'GET', '{}').then(function (data) {
          $scope.tipovacante = data.data
      });

      //Pais
      contenidoFactory.ServiceContenido('catalogs/countries/?format=json', 'GET', '{}').then(function (data) {
          $scope.paises = data.data;

      });

      //Divisas
      contenidoFactory.ServiceContenido('catalogs/currencies/?format=json', 'GET', '{}').then(function (data) {
          $scope.divisas = data.data;

      });

      //profesiones
      $scope.buscarprofesiones = function () {

          if ($scope.buscarprofesion == "") {
              $scope.profesiones = "";
          }
          else {
              contenidoFactory.ServiceContenido('catalogs/professions/?format=json', 'GET', '{}').then(function (data) {
                  //console.log(data.data);
                  $scope.profesiones = data.data;
                  $scope.tempData = [];

                  for (var j = 0; j < $scope.oferta.professions.length; j++) {
                      //$scope.tempProfesiones.push($scope.user.professions[j].id);
                      for (var i = 0; i < $scope.profesiones.length; i++) {
                          //$scope.tempData.push($scope.profesiones[i]);
                          //$scope.profesiones.splice(i, i + 1);
                          if ($scope.profesiones[i].id == $scope.oferta.professions[j].id) {
                              //console.log();
                              $scope.tempData.push($scope.profesiones[i]);

                              $scope.profesiones.splice(i, 1);
                          }

                      }
                  }
              });
          }
      }

      $scope.changeclassazul = function (obj) {

          if (document.getElementById('cb-' + obj.name).checked == true) {
              $scope.tempProfesiones.push(obj.id);
              $scope.oferta.professions.push({
                  id: obj.id,
                  name: obj.name
              });

              for (var j = 0; j < $scope.profesiones.length; j++) {

                  if ($scope.profesiones[j].id == obj.id) {
                      $scope.profesiones.splice(j, 1);
                  }
              }

              document.getElementById('btn-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp";
              document.getElementById('cb-' + obj.name).checked = false;
          }
          else {

              var index = $scope.tempProfesiones.indexOf(obj.id);
              $scope.tempProfesiones.splice(index, 1);
              $scope.oferta.professions.splice(index, 1);
              document.getElementById('cb-' + obj.name).checked = true;
              document.getElementById('btn-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
          }

      }

      //Interes
      $scope.changeinteres = function (obj) {

          if (document.getElementById('int-' + obj.name).checked == true) {
              $scope.tempIntereses.push(obj.id);

              $scope.oferta.interests.push({
                  id: obj.id,
                  name: obj.name
              });

              for (var j = 0; j < $scope.intereses.length; j++) {

                  if ($scope.intereses[j].id == obj.id) {
                      $scope.intereses.splice(j, 1);
                  }
              }

              document.getElementById('btnint-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp";
              document.getElementById('int-' + obj.name).checked = false;
          }
          else {
              var index = $scope.tempIntereses.indexOf(obj.id);
              $scope.tempIntereses.splice(index, 1);
              $scope.oferta.interests.splice(index, 1);
              document.getElementById('int-' + obj.name).checked = true;
              document.getElementById('btnint-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
          }
          console.log($scope.tempIntereses);
      }

      
      //Nueva Oferta
      $scope.guardarOferta = function (ev) {
          console.log($scope.oferta.opening_type);
          contenidoFactory.ServicePerfil('openings/' + $stateParams.id + '/edit/', 'PUT', {
              "opening_type": $scope.oferta.opening_type.id,
              "keep_company_alias": $scope.oferta.keep_company_alias,
              "alternate_company_alias": $scope.oferta.alternate_company_alias,
              "alternate_company_description": "",
              "name": $scope.oferta.name,
              "years_experience_opening": $scope.oferta.years_experience_opening,
              "years_experience": $scope.oferta.years_experience,
              "country": $scope.oferta.countrys,
              "city": $scope.oferta.city,
              "avaliability": $scope.oferta.avaliability,
              "salary": $scope.oferta.salary,
              "currency": $scope.oferta.currencys,
              "private_salary": $scope.oferta.private_salary,
              "open_opening": $scope.oferta.open_opening,
              "close_opening": $scope.oferta.close_opening,
              "activities": $scope.oferta.activities,
              "responsabilities": $scope.oferta.responsabilities,
              "key_skills": $scope.oferta.key_skills,
              "team_profile": $scope.oferta.team_profile,
              "interests": $scope.tempIntereses,
              "professions": $scope.tempProfesiones,
              "perks": $scope.oferta.perks,
              "relevant_details": $scope.oferta.relevant_details,
              "hire_type": $scope.oferta.hire_type,
              "status_opening": "published",
              "opening_class": $scope.oferta.opening_class

          }).then(function (data) {
              //$mdToast.show($mdToast.simple().content("Tus datos se han actualizado correctamente").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
              console.log(data);
              contenidoFactory.mensaje(ev, "Tus datos se han actualizado correctamente");
          });
      }

  }]);
