'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('VacanteCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', '$mdDialog', 'API_PATH', 'Socialshare', '$location', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window, $mdDialog, API_PATH, Socialshare, $location) {

    $scope.vacante = [{}];
    $scope.compania = [{}];
    $scope.rango = [{}];
    $scope.API_PATH_MEDIA = API_PATH_MEDIA;
    $scope.API_PATH = API_PATH;
    $scope.postulado = false;
    $scope.dialog = false;
    $scope.dialogvalidacion = false;
    var newLine = escape("\n");
    var url = "<a href'" + window.location.href + "'>" + window.location.href + "</a>"
    $scope.vacanteurl = 'mailto:?subject=Mira esta vacante en matteria, me parece que te puede interesar.&body=' + newLine + window.location.href + newLine + '';
    $scope.mensajeUrl =  window.location.href;
    //console.log($scope.mensajeUrl);
    $scope.role = $window.localStorage.role;
    $scope.isClick = false;
    $window.localStorage.validacion = false;
    $scope.idiomaLocal = $window.localStorage.idioma;

    $window.localStorage.url_vacante = $location.path();
    if ($location.path().split('/')[3] == "") {
      $location.path($location.path() + "es").replace();
    }

    if ($location.path().split('/')[3] == "matteria.covacante") {
      $location.path("matteria.co/vacante/" + $location.path.split('/')[4]).replace();
    }

    //cnsole.log($location.path().split('/').length);  

    //window.history.pushState('forward', null, './#forward');
    $(window).on('popstate', function() {
      $window.localStorage.if_url  = true;
      $window.location.href = $window.localStorage.url_return;
    });
    
    $scope.doTheBack = function () {
      //console.log($window.localStorage.url_vacante.split("api/")[1]);
      //$window.localStorage.url_vacante = $window.localStorage.url_vacante.split("api/")[1];
     // $window.localStorage.if_url  = true;
      $window.location.href = $window.localStorage.url_return;
      
     
    };
    
    $scope.face = function (url, descripcion, img) {
      FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object: {
            'fb:app_id': '2014416175460452',
            'og:url': 'https://matteria.co/vacante/' + url, // your url to share
            'og:title': 'Hola, encontré esta vacante y creo que te puede interesar',
            'og:description': descripcion,
            'og:image': API_PATH_MEDIA + img
          }
        })
      },
        //callback
        function (response) {
          if (response && !response.error_message) {
            // then get post content
            //alert('successfully posted. Status id : ' + response.post_id);
          } else {
            //alert('Something went error.');
          }
        });
    }

    $scope.postula = function (ev) {
      //console.log($scope.vacante);
      if (contenidoFactory.session()) {
        if ($scope.vacante.private_salary) {
          ventana();
        }
        else {
          $scope.isClick = true;
          contenidoFactory.ServicePerfil('candidates/me/', 'GET', '{}').then(function (data) {
            console.log(data);

            $scope.completud = data;
            if (data.first_name != null) {
              if (data.last_name != null) {
                if (data.email != null) {
                  if (data.cellphone_number != null || data.cellphone_number != "") {
                    if (data.WorkSocialExp_candidate.length != 0) {
                      if (data.Education_candidate.length != 0) {
                        if (data.professions.length != 0) {
                          if (data.interests.length != 0) {
                            if (data.exp_sectors.length != 0) {
                              if (data.exp_areas.length != 0) {
                                if (data.salary_max != 0) {
                                  if (data.avaliability != "") {
                                    if (data.hobbies != "") {
                                      if (data.abilities != "") {
                                        if (data.visted_countries != "") {
                                          if (data.extras != "") {
                                            if (data.Languages_candidate.length != 0) {
                                              contenidoFactory.ServicePerfil('openings/applications/create/', 'POST', {
                                                "candidate": $window.localStorage.id_candidate,
                                                "opening": $stateParams.id,
                                                "salary_min": $scope.desde,
                                                "salary_max": $scope.hasta
                                              }).then(function (data) {
                                                $window.location.href = "/postulacionrecibida/es";
                                              });
                                            }
                                            else {
                                              validacion();
                                            }
                                          }
                                          else {
                                            validacion();
                                          }
                                        }
                                        else {
                                          validacion();
                                        }
                                      }
                                      else {
                                        validacion();
                                      }
                                    }
                                    else {
                                      validacion();
                                    }
                                  }
                                  else {
                                    validacion();
                                  }
                                }
                                else {
                                  validacion();
                                }
                              }
                              else {
                                validacion();
                              }

                            }
                            else {
                              validacion();
                            }
                          }
                          else {
                            validacion();
                          }
                        }
                        else {
                          validacion();
                        }
                      }
                      else {
                        validacion();
                      }
                    }
                    else {
                      validacion();
                    }
                  }
                  else {
                    validacion();
                  }
                }
                else {
                  validacion();
                }
              }
              else {
                validacion();
              }
            }
            else {
              validacion();
            }
          });
        }
      }
      else {
        var confirm = $mdDialog.confirm(
          {
            targetEvent: ev,
            template: '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
            '<md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
            '<div class="md-dialog-content-body"><h4 class="negrita">Para poder aplicar a esta vacante es necesario estar registrado en materia.</h4></div>' +
            '</md-dialog-content>' +
            '<md-dialog-actions>' +
            '<md-button ng-click="dialog.hide()" class="md-primary md-confirm-button">Entendido</md-button>' +
            '<md-button ng-click="dialog.abort()" class="md-primary md-cancel-button">Cerrar</md-button>' +
            '</md-dialog-actions>' +
            '</md-dialog>'
          });
        $mdDialog.show(confirm).then(function () {
          $window.location.href = "/registro/postulante/es";
        });
      }
    }

    //Vacante
    contenidoFactory.ServiceContenido('openings/' + $stateParams.id + '/?format=json', 'GET', '{}').then(function (data) {
      console.log(data.data);
      $scope.vacante = data.data;
      contenidoFactory.ServiceContenido('companies/' + data.data.company_id + '/', 'GET', '{}').then(function (respuesta) {
        //console.log(respuesta.data);
        $scope.compania = respuesta.data;
      });
    });

    console.log($window.localStorage.role);
    if ($window.localStorage.role == 'POSTULANTE') {
      console.log($scope.postulado);
      contenidoFactory.ServicePerfil('openings/' + $stateParams.id + '/applied/?format=json', 'GET', '{}').then(function (data) {
        $scope.postulado = data.applied;
      });
    }


    function ventana() {
      $scope.dialog = true;

      $(function () {
        $("#dialog-confirm").dialog({
          open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog).hide();
            $(".ui-dialog-titlebar", ui.dialog).hide();
            $('body').css('overflow', 'hidden');
          },
          show: {
            effect: "fade",
            duration: 100
          },
          hide: {
            effect: "fade",
            duration: 100
          },
          resizable: false,
          height: "auto",
          width: 400,
          modal: true,
          buttons: [
            {
              text: 'Enviar',
              open: function () { $(this).addClass('md-primary md-confirm-button md-button md-autofocus md-ink-ripple md-default-theme') }, //will append a class called 'b' to the created 'OK' button.
              click: function () {
                $scope.isClick = true;
                $(this).dialog("close");
                $('body').css('overflow', 'scroll');
                $scope.dialog = false;
                contenidoFactory.ServicePerfil('candidates/me/', 'GET', '{}').then(function (data) {
                  console.log(data);
                  console.log(data.first_name);
                  $scope.completud = data;
                  if (data.first_name != null) {
                    if (data.last_name != null) {
                      if (data.email != null) {
                        if (data.cellphone_number != null || data.cellphone_number != "") {
                          if (data.WorkSocialExp_candidate.length != 0) {
                            if (data.Education_candidate.length != 0) {
                              if (data.professions.length != 0) {
                                if (data.interests.length != 0) {
                                  if (data.exp_sectors.length != 0) {
                                    if (data.exp_areas.length != 0) {
                                      if (data.salary_max != 0) {
                                        if (data.avaliability != "") {
                                          if (data.hobbies != "") {
                                            if (data.abilities != "") {
                                              if (data.visted_countries != "") {
                                                if (data.extras != "") {
                                                  if (data.Languages_candidate.length != 0) {
                                                    contenidoFactory.ServicePerfil('openings/applications/create/', 'POST', {
                                                      "candidate": $window.localStorage.id_candidate,
                                                      "opening": $stateParams.id,
                                                      "salary_min": $scope.desde,
                                                      "salary_max": $scope.hasta
                                                    }).then(function (data) {
                                                      $window.location.href = "/postulacionrecibida/es";
                                                    });
                                                  }
                                                  else {
                                                    validacion();
                                                  }                                                  
                                                }
                                                else {
                                                  validacion();
                                                }
                                              }
                                              else {
                                                validacion();
                                              }
                                            }
                                            else {
                                              validacion();
                                            }
                                          }
                                          else {
                                            validacion();
                                          }
                                        }
                                        else {
                                          validacion();
                                        }
                                      }
                                      else {
                                        validacion();
                                      }                                      
                                    }
                                    else {
                                      validacion();
                                    }
                                    
                                  }
                                  else {
                                    validacion();
                                  }                                  
                                }
                                else {
                                  validacion();
                                }
                              }
                              else {
                                validacion();
                              }                             
                            }
                            else {
                              validacion();
                            }
                          }
                          else {
                            validacion();
                          }
                        }
                        else {
                          validacion();
                        }
                      }
                      else {
                        validacion();
                      }
                    }
                    else {
                      validacion();
                    }
                  }
                  else {
                    validacion();
                  }
                });
              }
            },
            {
              text: "Cancelar", //md-primary md-cancel-button md-button md-ink-ripple md-default-theme
              open: function () { $(this).addClass('md-primary md-cancel-button md-button md-ink-ripple md-default-theme') }, //will append a class called 'b' to the created 'OK' button.
              click: function () {
                $(this).dialog("close");
                $('body').css('overflow', 'scroll');
                $scope.dialog = false;
              }
            }
          ]
        });
      });
    }

    function validacion() {
      $scope.dialogvalidacion = true;

      $(function () {
        $("#dialog-confirm-validacion").dialog({
          open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog).hide();
            $(".ui-dialog-titlebar", ui.dialog).hide();
            $('body').css('overflow', 'hidden');
          },
          show: {
            effect: "fade",
            duration: 100
          },
          hide: {
            effect: "fade",
            duration: 100
          },
          resizable: false,
          height: "auto",
          width: 400,
          modal: true,
          buttons: [
            {
              text: 'Ir a mi perfil',
              open: function () { $(this).addClass('md-primary md-confirm-button md-button md-autofocus md-ink-ripple md-default-theme') }, //will append a class called 'b' to the created 'OK' button.
              click: function () {
                $scope.isClick = true;
                $(this).dialog("close");
                $('body').css('overflow', 'scroll');
                $scope.dialogvalidacion = false;
                $window.location.href = "/perfilpostulante/";
                $window.localStorage.validacion = true;
              }
            },
            {
              text: "Cancelar", //md-primary md-cancel-button md-button md-ink-ripple md-default-theme
              open: function () { $(this).addClass('md-primary md-cancel-button md-button md-ink-ripple md-default-theme') }, //will append a class called 'b' to the created 'OK' button.
              click: function () {
                $(this).dialog("close");
                $('body').css('overflow', 'scroll');
                $scope.dialogvalidacion = false;
              }
            }
          ]
        });
      });
    }

  }]);
