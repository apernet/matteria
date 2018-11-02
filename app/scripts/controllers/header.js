'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('HeaderCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', '$http', '$translate', '$location', '$stateParams', function ($scope, API_PATH_MEDIA, contenidoFactory, $window, $http, $translate, $location, $stateParams) {
    $scope.API_PATH_MEDIA = API_PATH_MEDIA;
    $scope.avatar = $window.localStorage.avatar;
    $scope.nombre = $window.localStorage.nombre;
    $scope.classs = 'cargador'
    $scope.pago = true;

    console.log($window.localStorage.url_vacante);
    console.log($location.path());
    if ($location.path().split('/').length == 3) {
      if ($location.path().split('/')[1] == "vacante") {
        //console.log("ENTROOO");
        $window.location.href = $location.path() + "/es";
      }      
      //$location.path("vacante/457/es").replace();
    }

    if ($window.localStorage.idioma == 'es_MX') {
      $scope.idiomaLocal = 'es';
    }
    if ($window.localStorage.idioma == 'en_EN') {
      $scope.idiomaLocal = 'en';
    }
    if ($window.localStorage.idioma == 'pt_BR') {
      $scope.idiomaLocal = 'pt';
    }
   
    //localStorage.setItem('ingreso', "")

    if ($window.localStorage.idioma == undefined) {
      $scope.idiomaLocal = $window.localStorage.idioma = 'es_MX';
    }

    //console.log(window.location.pathname.split("/")[1]);
    if (window.location.pathname.split("/")[1] == "pagos") {
      $scope.pago = false;
      document.getElementById('divpago').style.display = 'block'; 
    }
    else {
      $scope.pago = true;
    }

    switch ($location.path()) {
      case '/en':
        $window.localStorage.idioma = 'en_EN';
        $scope.idiomaLocal = 'en_EN';
        break;
      case '/es':
        $window.localStorage.idioma = 'es_MX';
        $scope.idiomaLocal = 'es_MX';
      case '/br':
        $window.localStorage.idioma = 'pt_BR';
        $scope.idiomaLocal = 'pt_BR';
        break;
      default:

    }
    //if ($location.path() == '/en') {
    //  //console.log($location.path());
    //  $window.localStorage.idioma = 'en_EN';
    //  $scope.idiomaLocal = 'en_EN';
    //  //$window.location.assign('/#!/en');
    //}
    //else {
    //  //console.log($location.path());
    //  $window.localStorage.idioma = 'es_MX';
    //  $scope.idiomaLocal = 'es_MX';
    //  //$window.location.assign('/#!/es');
    //}

    $scope.salir = function () {
      $window.localStorage.clear();
      $window.location.assign('/ingresa');
      $window.localStorage.idioma = 'es_MX';
      $window.sessionStorage['sesionNext'] = "";
    }

    contenidoFactory.ServiceContenido('fcm/logos/?format=json', 'GET', '{}').then(function (data) {
      
      //document.getElementById('div_header').style.display = 'none'; 
      $scope.logo = data.data
      $window.localStorage.en = API_PATH_MEDIA + $scope.logo[0].logo_en;
      $window.localStorage.es = API_PATH_MEDIA + $scope.logo[0].logo;
      $window.localStorage.pt = API_PATH_MEDIA + $scope.logo[0].logo_pt;
      CargarImagenes();
      document.getElementById('div_header').style.display = 'block';
      document.getElementById('div_footer').style.display = 'block';
      //$scope.classs = 'display:block;';


    });

    $scope.changeLanguage = function (key) {
      //console.log(key);
      //$window.localStorage.idioma = key;
      switch (key) {
        case 'es_MX':
          //console.log($location.path().split("/")[$location.path().split("/").length - 1]);
          $location.path($location.path().replace("/" + $location.path().split("/")[$location.path().split("/").length - 1], "/es")).replace();
          break;
        case 'en_EN':
          //console.log("OK_1");
          $location.path($location.path().replace("/" + $location.path().split("/")[$location.path().split("/").length - 1], "/en")).replace();
          break;
        case 'pt_BR':
          //console.log("OK_2");
          $location.path($location.path().replace("/" + $location.path().split("/")[$location.path().split("/").length - 1], "/pt")).replace();
          break;
        default:

      }

      //if (key == "es_MX") {
      //  $location.path($location.path().replace("/en", "/es")).replace();
      //}
      //else {
      //  $location.path($location.path().replace("/es", "/en")).replace();
      //}
    };
    //$window.localStorage.idioma = data.token;
    //$scope.idioma = "es_MX";

    $scope.calcularHeader = function () {

      switch ($location.path().split("/")[$location.path().split("/").length - 1]) {
        case 'es':
          $window.localStorage.idioma = 'es_MX';
          break;
        case 'en':
          $window.localStorage.idioma = 'en_EN';
          break;
        case 'pt':
          $window.localStorage.idioma = 'pt_BR';
          break;
        default:

      }

      //if ($location.path().split("/")[$location.path().split("/").length - 1] == 'en') {
      //  $window.localStorage.idioma = 'en_EN';

      //}
      //else {
      //  $window.localStorage.idioma = 'es_MX';

      //}

      if ($window.localStorage.idioma == 'es_MX') {
        $scope.idiomaLocal = 'es_MX';
        $scope.lg = $window.localStorage.es;
        //$location.path($location.path().replace("/" + $location.path().split("/")[$location.path().split("/").length - 1], "/es")).replace();
      }
      else {
        if ($window.localStorage.idioma == 'en_EN') {
          $scope.idiomaLocal = 'en_EN';
          $scope.lg = $window.localStorage.en;
          //$location.path($location.path().replace("/" + $location.path().split("/")[$location.path().split("/").length - 1], "/en")).replace();    
        }
        else {
          if ($window.localStorage.idioma == 'pt_BR') {
            $scope.idiomaLocal = 'pt_BR';
            $scope.lg = $window.localStorage.pt;
            //$location.path($location.path().replace("/" + $location.path().split("/")[$location.path().split("/").length - 1], "/pt")).replace();
          }
        }
      }


    }

    $scope.$watch($scope.calcularHeader);

    function CargarImagenes() {
      $(".post-carga").each(function () {
        $(this).attr('src', $(this).data('src')).on('load', function () {
          $(this).fadeIn();
        });
      })
    }

    $scope.validar = function () {
      $window.localStorage.validacion = false;
    }
  }]);
