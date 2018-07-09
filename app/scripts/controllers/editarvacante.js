'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:EditarVacanteCtrl
 * @description
 * # EditarVacanteCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('EditarVacanteCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', 'focus', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window, focus) {

     //Ver datos de la vacante a editar
     contenidoFactory.ServiceContenido('openings/' + $stateParams.id + '/?format=json', 'GET', '{}').then(function (data) {
        console.log(data.data);
        $scope.oferta = data.data;
      });


      $scope.professions = [];
      $scope.tempProfesiones = [];
      $scope.tempIntereses = [];
      $scope.oferta = [{}];
      $scope.servicios = [{}];
      $scope.IsCiudad = true;
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.textarea = "";


    //Tipo de vacantes
    contenidoFactory.ServiceContenido('catalogs/opening-services/?format=json', 'GET', '{}').then(function (data) {
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

    //Estados
    $scope.selectEstado = function () {
        $scope.estados = [{}];
        contenidoFactory.ServiceContenido('catalogs/countries/' + $scope.oferta.pais + '/states/?format=json', 'GET', '{}').then(function (data) {
            console.log(data.data);
            $scope.estados = data.data;

            if ($scope.estados == "") {
                $scope.IsCiudad = false;
            }
            else {
                $scope.IsCiudad = true;
            }
        });
    }

    //intereses
    contenidoFactory.ServiceContenido('catalogs/interests/?format=json', 'GET', '{}').then(function (data) {
        $scope.intereses = data.data;
    });

     //profesiones
     contenidoFactory.ServiceContenido('catalogs/professions/?format=json', 'GET', '{}').then(function (data) {
        $scope.profesiones = data.data;
    });

    $scope.changeinteres = function (obj) {
        if (document.getElementById('int-' + obj.name).checked == true) {
            var index = $scope.tempIntereses.indexOf(obj.id);
            $scope.tempIntereses.splice(index, 1);
            document.getElementById('btnint-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
            document.getElementById('int-' + obj.name).checked = false;
        }
        else {
            $scope.tempIntereses.push(obj.id);

            document.getElementById('int-' + obj.name).checked = true;
            document.getElementById('btnint-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp";
        }
        console.log($scope.tempIntereses);
    }
    $scope.changeprofesiones = function (obj) {
        if (document.getElementById('pro-' + obj.name).checked == true) {
            var index = $scope.tempProfesiones.indexOf(obj.id);
            $scope.tempProfesiones.splice(index, 1);
            document.getElementById('btnpro-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
            document.getElementById('pro-' + obj.name).checked = false;
        }
        else {
            $scope.tempProfesiones.push(obj.id);

            document.getElementById('pro-' + obj.name).checked = true;
            document.getElementById('btnpro-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp";
        }
        console.log($scope.tempProfesiones);
    }


    $scope.editarVacante = function (ev) {
        
        contenidoFactory.ServicePerfil('openings/' + $stateParams.id + '/edit/', 'PUT', {
            "opening_type": $scope.oferta.tipo,
            "keep_company_alias": $scope.oferta.keep_company_alias,
            "alternate_company_alias": $scope.oferta.alternate_company_alias,
            "alternate_company_description": "",
            "name": $scope.oferta.name,
            "years_experience_opening": $scope.oferta.years_experience_opening,
            "years_experience": $scope.oferta.years_experience,
            "country": $scope.oferta.pais,
            "city": $scope.oferta.city,
            "avaliability": $scope.oferta.avaliability,
            "salary": $scope.oferta.salary,
            "currency": $scope.oferta.moneda,
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
            //"opening_class": $scope.oferta.opening_class

        }).then(function (data) {
            //$mdToast.show($mdToast.simple().content("Tus datos se han actualizado correctamente").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
            console.log(data);
            contenidoFactory.mensaje(ev, "Tus datos se han actualizado correctamente");
        });
    }
    $scope.error = function () {
        //console.log($scope.oferta.activities);
        if ($scope.oferta.name == undefined || $scope.oferta.name == "") {
            focus('oferta.name');
        }
        else {
            if ($scope.oferta.opening_type == undefined || $scope.oferta.opening_type == "") {
                focus('oferta.opening_type');
            }
            else {
                if ($scope.oferta.country == undefined || $scope.oferta.country == "") {
                    focus('oferta.country');
                }
                else {
                    if ($scope.oferta.years_experience_opening == undefined || $scope.oferta.years_experience_opening == "") {
                        focus('oferta.years_experience_opening');
                    }
                    else {
                        if ($scope.oferta.years_experience == undefined || $scope.oferta.years_experience == "") {
                            focus('oferta.years_experience');
                        }
                        else {
                            if ($scope.oferta.avaliability == undefined || $scope.oferta.avaliability == "") {
                                focus('oferta.avaliability');
                            }
                            else {
                                if ($scope.oferta.salary == undefined || $scope.oferta.salary == "") {
                                    focus('oferta.salary');
                                }
                                else {
                                    if ($scope.oferta.open_opening == undefined || $scope.oferta.open_opening == "") {
                                        focus('oferta.open_opening');
                                    }
                                    else {
                                        if ($scope.oferta.close_opening == undefined || $scope.oferta.close_opening == "") {
                                            focus('oferta.close_opening');
                                        }
                                        else {
                                            if ($scope.oferta.hire_type == undefined || $scope.oferta.hire_type == "") {
                                                focus('oferta.hire_type');
                                            }
                                            //else {
                                            //    if ($scope.oferta.activities == undefined || $scope.oferta.activities == "") {
                                            //        console.log("YUUU");
                                            //        focus('oferta.activities');
                                            //        $scope.textarea = 'select_textarea';
                                            //    }
                                                
                                            //}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

  }]);
