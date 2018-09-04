'use strict';

angular.module('tcsGruntApp')
  .controller('RegistroCtrl', ['$scope', '$http', 'API_PATH_MEDIA', 'contenidoFactory', 'API_PATH', '$window', '$stateParams', function ($scope, $http, API_PATH_MEDIA, contenidoFactory, API_PATH, $window, $stateParams) {

    $scope.RegistroPostulante = {};
    $scope.RegistroOrganizaciones = {};
    $scope.RegistroPostulante.acepto = false;
    $scope.message = "";
    $scope.disablep = "";
    $scope.disableo = "";
    $scope.classregistro
    $scope.idiomaLocal = $window.localStorage.idioma;

    //$scope.calcular = function () {

    //    if ($window.localStorage.idioma == 'es_MX') {
    //        $scope.idiomaLocal = 'es_MX';
    //    }
    //    else {
    //        $scope.idiomaLocal = 'en_EN';
    //    }
    //    //$scope.matteria = $scope.matteria;

    //}
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
      $scope.matteria = $scope.matteria;
    }

    $scope.$watch($scope.calcular);


    if ($stateParams.user == "postulante") {
      $scope.disableo = false;
      $scope.disablep = true;
      $scope.classregistro = "col-xs-12 col-md-6 col-md-offset-3 text-left"
      //col-xs-12 col-md-6 col-md-offset-4
    }
    if ($stateParams.user == "organizacion") {
      $scope.disableo = true;
      $scope.disablep = false;
      $scope.classregistro = "col-xs-12 col-md-6 col-md-offset-3 text-left"
    }
    if ($stateParams.user == "ambos") {
      $scope.disableo = true
      $scope.disablep = true;
      $scope.classregistro = "col-xs-12 col-md-6 text-left"
    }

    var ev;
    catalogos();
    function catalogos() {
      var _data = "";
      //tipo organizacion
      contenidoFactory.ServiceContenido('catalogs/company-types/?format=json', 'GET', '{}').then(function (data) {
        $scope.tipoorganizacion = data.data;
        //_data = data.status;
        if (data.status == '-1' || data.status == '500' || data.status == '400') {
          _data = contenidoFactory.mensaje(ev, "Algo salio mal, por favor vuele a cargar la página");
          //_data = true;
        };

      });
      //servicio organizacion
      contenidoFactory.ServiceContenido('catalogs/company-services/?format=json', 'GET', '{}').then(function (data) {
        $scope.serviciosorganizacion = data.data
        //_dataservicio = data.status;
        if (data.status == '-1' || data.status == '500' || data.status == '400') {
          _data = contenidoFactory.mensaje(ev, "Algo salio mal, por favor vuele a cargar la página");
        };
      });
      //Como te enteraste 
      contenidoFactory.ServiceContenido('catalogs/ad-channels/?format=json', 'GET', '{}').then(function (data) {
        $scope.comoteenteraste = data.data
        if (data.status == '-1' || data.status == '500' || data.status == '400') {
          _data = contenidoFactory.mensaje(ev, "Algo salio mal, por favor vuele a cargar la página");
        };
      });

      return _data;
    }

    $scope.selected = [];
    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    };

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    $scope.RegistroPostulantes = function (ev) {
      console.log($scope.selected);
      if ($scope.RegistroPostulante.comoenteraste == 0) {
        var _comoenteraste = 6;
      }
      else {
        var _comoenteraste = $scope.RegistroPostulante.comoenteraste;
      }

      if ($scope.RegistroPostulante.acepto) {
        contenidoFactory.ServiceContenido('candidates/register/', 'POST', {
          first_name: $scope.RegistroPostulante.nombre,
          last_name: $scope.RegistroPostulante.apellidos,
          email: $scope.RegistroPostulante.correo,
          password: $scope.RegistroPostulante.contrasena,
          candidateProfile: {
            answer_1: $scope.RegistroPostulante.answer_1,
            //answer_2: $scope.selected,
            answer_3: $scope.RegistroPostulante.tipoarea,
            terms_politics: $scope.RegistroPostulante.acepto,
            how_hear_about_us: _comoenteraste,
            cellphone_number: $scope.RegistroPostulante.cellphone_number
          }
        }).then(function (data) {
          //console.log(data.status);
          if (data.status == '500' || data.status == '-1' || data.status == '400') {
            contenidoFactory.mensaje(ev, data.data);
          };

          if (data.data.response == "Usuario registrado exitosamente") {
            contenidoFactory.login($scope.RegistroPostulante.correo, $scope.RegistroPostulante.contrasena, 'candidates/login/').then(function (respuesta) {
              if (respuesta.response == "Sesión exitosa") {
                console.log(respuesta.id_candidate);
                contenidoFactory.ServiceContenido('candidates/'+respuesta.id_candidate+'/edit/profile-invorg/', 'PUT', {
                  answer_2: $scope.selected
                }).then(function (respuestaSer) {
                  console.log(respuestaSer);
                });
                // location.href = "/graciasregistropostulante";
                $window.localStorage.role = "POSTULANTE";
                $window.localStorage.token = respuesta.token;
                $window.localStorage.avatar = respuesta.avatar;
                $window.localStorage.nombre = respuesta.name;
                $window.localStorage.id_user = respuesta.id_user;
                $window.localStorage.id_candidate = respuesta.id_candidate;
              }
              else {
                //$mdToast.show($mdToast.simple().content(respuesta.response).parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
                //contenidoFactory.mensaje(ev, respuesta.response);
              }

            });
          }
          else {
            //$mdToast.show($mdToast.simple().content(data.data.response).parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
            contenidoFactory.mensaje(ev, data.data.response);

          }

        });
      }
      else {
        //$mdToast.show($mdToast.simple().content("Debes aceptar los términos y condiciones.").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
        contenidoFactory.mensaje(ev, "Debes aceptar los términos y condiciones.");
      }
    }

    $scope.RegistroOrganizacion = function (ev) {
      if ($scope.Registroorganizacion.comoenteraste == 0) {
        var _comoenteraste = 6;
      }
      else {
        var _comoenteraste = $scope.Registroorganizacion.comoenteraste;
      }

      if ($scope.Registroorganizacion.acepto) {
        contenidoFactory.ServiceContenido('companies/register/', 'POST', {
          //last_name: $scope.Registroorganizacion.nombre,
          email: $scope.Registroorganizacion.correo,
          password: $scope.Registroorganizacion.contrasena,
          companyProfile: {
            //NIT: $scope.Registroorganizacion.notributario,
            name: $scope.Registroorganizacion.nombre,
            contact_name: $scope.Registroorganizacion.responsable,
            contact_phone_number: $scope.Registroorganizacion.telefono,
            contact_cellphone_number: $scope.Registroorganizacion.telefonomovil,
            services_register: $scope.Registroorganizacion.servicioorganizacion,
            how_hear_about_us: _comoenteraste,
            other: $scope.Registroorganizacion.otros,
            terms_politics: $scope.Registroorganizacion.acepto,
            description: $scope.Registroorganizacion.description,
            our_impactinfo: $scope.Registroorganizacion.our_impactinfo,
          }

        }).then(function (data) {
          console.log(data);
          //$mdToast.show($mdToast.simple().content(data.data.response).parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
          //contenidoFactory.mensaje(ev, data.data.response);
          if (data.status == '500' || data.status == '-1' || data.status == '400') {
            contenidoFactory.mensaje(ev, data.data);
          };

          if (data.data.response == "Usuario registrado exitosamente") {
            location.href = "/graciasregistroorganizacion";
          }
          else {
            //$mdToast.show($mdToast.simple().content(data.data.response).parent($("#toast-container")).hideDelay(6000).theme('error-toast'));                      
            contenidoFactory.mensaje(ev, data.data);
          }

        });
      }
      else {
        //$mdToast.show($mdToast.simple().content("Debes aceptar los términos y condiciones.").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
        contenidoFactory.mensaje(ev, "Debes aceptar los términos y condiciones.");
      }

    }
  }]);
