'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('MainCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$interpolate', 'API_PATH', '$window', '$stateParams', '$location', function ($scope, API_PATH_MEDIA, contenidoFactory, $interpolate, API_PATH, $window, $stateParams, $location) {

    $scope.fastfacts = [{}];
    $scope.ofertas = [{}];
    $scope.quehacemos = [{}];
    $scope.comofunciona = [{}];
    $scope.regpro = [{}];
    $scope.regorg = [{}];
    $scope.aliados = [{}];
    $scope.clientes = [{}];
    $scope.Wrapper_slider1 = [{}];
    $scope.Wrapper_slider2 = [{}];
    $scope.blog = [{}];
    $scope.API_PATH_MEDIA = API_PATH_MEDIA;
    $scope.idiomaLocal = $window.localStorage.idioma;
    $scope.text = "";

    $scope.Indicators = "";
    $scope.Wrapper = "";
    $scope.IndicatorsEsp = "";
    $scope.WrapperEsp = "";
    $scope.IndicatorsIn = "";
    $scope.WrapperIn = "";
    $scope.IndicatorsPt = "";
    $scope.WrapperPt = "";

    //console.log($stateParams.idioma);

    if ($location.path() == '/') {
      $location.path('/es').replace();
      //console.log($location.path());
    }

    switch ($stateParams.idioma) {
      case 'en':
        $window.localStorage.idioma = 'en_EN';
        $scope.idiomaLocal = 'en_EN';
        break;
      case 'es':
        $window.localStorage.idioma = 'es_MX';
        $scope.idiomaLocal = 'es_MX';
      case 'pt':
        $window.localStorage.idioma = 'pt_BR';
        $scope.idiomaLocal = 'pt_BR';
        break;
      default:

    }

    //if ($stateParams.idioma == 'en') {
    //  $window.localStorage.idioma = 'en_EN';
    //  $scope.idiomaLocal = 'en_EN';
    //  //$window.location.assign('/#!/en');
    //}
    //else {
    //  $window.localStorage.idioma = 'es_MX';
    //  $scope.idiomaLocal = 'es_MX';
    //  //$window.location.assign('/#!/es');
    //}

    $scope.calcular = function () {

      if ($window.localStorage.idioma == 'es_MX') {
        $scope.idiomaLocal = 'es_MX';
        $scope.Indicators = $scope.IndicatorsEsp;
        $scope.Wrapper = $scope.WrapperEsp;
      }
      else {
        if ($window.localStorage.idioma == 'en_EN') {
          $scope.idiomaLocal = 'en_EN';
          $scope.Indicators = $scope.IndicatorsIn;
          $scope.Wrapper = $scope.WrapperIn;
        }
        else {
          if ($window.localStorage.idioma == 'pt_BR') {
            $scope.idiomaLocal = 'pt_BR';
            $scope.Indicators = $scope.IndicatorsPt;
            $scope.Wrapper = $scope.WrapperPt;
          }
        }
      }
    }

    $scope.$watch($scope.calcular);

    //Carrousel
    carrousel();
    function carrousel() {
      contenidoFactory.ServiceContenido('fcm/sliders/', 'GET', '{}').then(function (data) {
        //(data);             
        //console.log(data);
        $scope.IndicatorsEsp += '<ol class="carousel-indicators">';
        for (var i = 0; i < data.data.length; i++) {
          switch (i) {
            case 0:
              $scope.IndicatorsEsp += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>'
              $scope.WrapperEsp += '<div class="item active">' +
                '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                '<div class="carousel-caption">' +
                '<span class="negrita hidden-xs">' + data.data[i].mensaje + '</span>' +
                '</div>' +
                '<div class="carousel-caption-boton">' +
                '<a href="/quienessomos/manifiesto/es#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton + '</a>' +
                '<a href="/quienessomos/manifiesto/es#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton + '</a>' +
                '</div>' +
                '</div>';
              break;
            default:
              $scope.IndicatorsEsp += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>'
              $scope.WrapperEsp += '<div class="item">' +
                '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                '<div class="carousel-caption">' +
                '<span class="negrita hidden-xs">' + data.data[i].mensaje + '</span>' +
                '</div>' +
                '<div class="carousel-caption-boton">' +
                '<a href="/quienessomos/manifiesto/es#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton + '</a>' +
                '<a href="/quienessomos/manifiesto/es#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton + '</a>' +
                '</div>' +
                '</div>';
          }

        }

        $scope.IndicatorsIn += '<ol class="carousel-indicators">';
        //$scope.IndicatorsIn += '<ol class="carousel-indicators">';
        $scope.IndicatorsPt += '<ol class="carousel-indicators">';
        //$scope.IndicatorsPt += '<ol class="carousel-indicators">';
        for (var i = 0; i < data.data.length; i++) {
          switch (i) {
            case 0:
              $scope.IndicatorsIn += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>'
              $scope.WrapperIn += '<div class="item active">' +
                '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                '<div class="carousel-caption">' +
                '<span class="negrita hidden-xs">' + data.data[i].mensaje_en + '</span>' +
                '</div>' +
                '<div class="carousel-caption-boton">' +
                '<a href="/quienessomos/manifiesto/en#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton_en + '</a>' +
                '<a href="/quienessomos/manifiesto/en#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton_en + '</a>' +
                '</div>' +
                '</div>';

              $scope.IndicatorsPt += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>'
              $scope.WrapperPt += '<div class="item active">' +
                '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                '<div class="carousel-caption">' +
                '<span class="negrita hidden-xs">' + data.data[i].mensaje_pt + '</span>' +
                '</div>' +
                '<div class="carousel-caption-boton">' +
                '<a href="/quienessomos/manifiesto/en#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton_pt + '</a>' +
                '<a href="/quienessomos/manifiesto/en#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton_pt + '</a>' +
                '</div>' +
                '</div>';
              break;
            default:
              $scope.IndicatorsIn += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>'
              $scope.WrapperIn += '<div class="item">' +
                '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                '<div class="carousel-caption">' +
                '<span class="negrita hidden-xs">' + data.data[i].mensaje_en + '</span>' +
                '</div>' +
                '<div class="carousel-caption-boton">' +
                '<a href="/quienessomos/manifiesto/en#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton_en + '</a>' +
                '<a href="/quienessomos/manifiesto/en#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton_en + '</a>' +
                '</div>' +
                '</div>';

              $scope.IndicatorsPt += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>'
              $scope.WrapperPt += '<div class="item">' +
                '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                '<div class="carousel-caption">' +
                '<span class="negrita hidden-xs">' + data.data[i].mensaje_pt + '</span>' +
                '</div>' +
                '<div class="carousel-caption-boton">' +
                '<a href="/quienessomos/manifiesto/en#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton_pt + '</a>' +
                '<a href="/quienessomos/manifiesto/en#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton_pt + '</a>' +
                '</div>' +
                '</div>';
          }

        }

        $scope.IndicatorsEsp += '</ol>';
        $scope.IndicatorsIn += '</ol>';
        $scope.IndicatorsPt += '</ol>';
      });
    }

    //Fast Facts
    contenidoFactory.ServiceContenido('fcm/fast-facts/', 'GET', '{}').then(function (data) {
      $scope.fastfacts = data.data;
    });

    //Ofertas destacadas
    contenidoFactory.ServiceContenido('openings/', 'GET', '{}').then(function (data) {

      //console.log(data.data.results.length);
      var content = [];
      var text = [];
      for (var i = 0; i < data.data.results.length; i++) {
        //console.log(content[i]);
        $scope.ofertas.push({
          company_logo: data.data.results[i].company_logo,
          name: data.data.results[i].name,
          company: data.data.results[i].company,
          activities: htmlToPlaintext(data.data.results[i].activities),
          keep_company_alias: data.data.results[i].keep_company_alias,
          alternate_company_alias: data.data.results[i].alternate_company_alias,
          alternate_company_description: data.data.results[i].alternate_company_description,
          id: data.data.results[i].id
        });
        //$scope.ofertas.push(content[i]);
      }

      //console.log($scope.ofertas);
    });

    function htmlToPlaintext(text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    //Que hacemos
    contenidoFactory.ServiceContenido('fcm/que-hacemos/', 'GET', '{}').then(function (data) {
      //console.log(data.data);
      $scope.quehacemos = data.data;
    });

    //Como funciona
    contenidoFactory.ServiceContenido('fcm/como-funciona/', 'GET', '{}').then(function (data) {
      //console.log(data.data);
      $scope.comofunciona = data.data;
    });

    //Registro profesional
    contenidoFactory.ServiceContenido('fcm/reg-pro/', 'GET', '{}').then(function (data) {
      $scope.regpro = data.data;
      //console.log(data);
    });

    //Registro organizacion
    contenidoFactory.ServiceContenido('fcm/reg-org/', 'GET', '{}').then(function (data) {
      //console.log(data);
      $scope.regorg = data.data;
    });

    //Nuestros aliados
    contenidoFactory.ServiceContenido('fcm/aliados/', 'GET', '{}').then(function (data) {
      //.log(data.data);
      $scope.aliados = data.data;
    });

    //Carrousel Clientes
    contenidoFactory.ServiceContenido('fcm/clientes/', 'GET', '{}').then(function (data) {
      //console.log(data.data);

      if (data.data.length % 2 == 1) {
        for (var i = 0; i < Math.round(data.data.length / 2); i++) {
          $scope.Wrapper_slider1.push({
            cliente_website_url: data.data[i].cliente_website_url,
            imagen: $scope.API_PATH_MEDIA + data.data[i].imagen
          });
        }

        for (var i = Math.round(data.data.length / 2); i < data.data.length; i++) {
          $scope.Wrapper_slider2.push({
            cliente_website_url: data.data[i].cliente_website_url,
            imagen: $scope.API_PATH_MEDIA + data.data[i].imagen
          });
        }
      }
      else {
        for (var i = 0; i < data.data.length / 2; i++) {
          $scope.Wrapper_slider1.push({
            cliente_website_url: data.data[i].cliente_website_url,
            imagen: $scope.API_PATH_MEDIA + data.data[i].imagen
          });
        }

        for (var i = data.data.length / 2; i < data.data.length; i++) {
          $scope.Wrapper_slider2.push({
            cliente_website_url: data.data[i].cliente_website_url,
            imagen: $scope.API_PATH_MEDIA + data.data[i].imagen
          });
        }
      }

      $scope.Wrapper_slider1.splice(0, 1);
      $scope.Wrapper_slider2.splice(0, 1);

      //console.log($scope.Wrapper_slider1);
      //console.log($scope.Wrapper_slider2);
    });

    //Blog
    contenidoFactory.ServiceContenido('fcm/blog/', 'GET', '{}').then(function (data) {
      //console.log(data);
      $scope.text = data.data[0].descripcion;
      $scope.blog = data.data;

    });

  }]);
