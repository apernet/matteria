'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('QuienesSomosCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$mdToast', '$window', function ($scope, API_PATH_MEDIA, contenidoFactory, $mdToast, $window) {

    $scope.matteria = [{}];
    $scope.diferente = [];
    $scope.valores = [{}];
    $scope.equipo = [{}];
    $scope.descripcioquienesomos = "";
    $scope.tituloquienesomos = "";
    $scope.API_PATH_MEDIA = API_PATH_MEDIA;
    $scope.idiomaLocal = $window.localStorage.idioma;

    //$scope.calcular = function () {

    //  if ($window.localStorage.idioma == 'es_MX') {
    //    $scope.idiomaLocal = 'es_MX';
    //  }
    //  else {
    //    $scope.idiomaLocal = 'en_EN';
    //  }
    //  $scope.matteria = $scope.matteria;

    //}
    localStorage.setItem('ingreso', "")
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

    $scope.hovertexto = function (obj) {
      $scope.tituloquienesomos = obj.titulo;
      $scope.descripcioquienesomos = obj.descripcion;
    }

    $scope.hovertextoout = function () {
      $scope.tituloquienesomos = "";
      $scope.descripcioquienesomos = "";
    }

    //Infografia
    contenidoFactory.ServiceContenido('fcm/matteria-info/?format=json', 'GET', '{}').then(function (data) {
      console.log(data.data);
      $scope.matteria = data.data;
    });

    //En que somsos diferentes
    contenidoFactory.ServiceContenido('fcm/somos-diferentes/?format=json', 'GET', '{}').then(function (data) {
      //$scope.diferente = data.data
      $scope.color = ['#37B34A', '#FBAE25', '#E34A26', '#A51840', '#372A7C', '#26A9E0'];
      for (var i = 0; i < data.data.length; i++) {
        $scope.diferente.push({
          descripcion: data.data[i].descripcion,
          descripcion_en: data.data[i].descripcion_en,
          descripcion_pt: data.data[i].descripcion_pt,
          imagen: data.data[i].imagen,
          titulo: data.data[i].titulo,
          titulo_en: data.data[i].titulo_en,
          titulo_pt: data.data[i].titulo_pt,
          color: $scope.color[i]
        })
      }
      console.log($scope.diferente);
    });

    //Valores
    contenidoFactory.ServiceContenido('fcm/valores-matteria-info/?format=json', 'GET', '{}').then(function (data) {
      //console.log(data);
      $scope.valores = data.data
    });

    //<img class="img-circle" src="{{API_PATH_MEDIA}}{{equipos.imagen}}" />
    //              <h4 class="negrita">{{equipos.nombre}}</h4>
    //              <h4 class="negrita">{{equipos.puesto}}</h4>
    //              <a href="{{equipos.linkedin}}"><i class="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
    //Nuestro equipo
    contenidoFactory.ServiceContenido('fcm/equipo/?format=json', 'GET', '{}').then(function (data) {
      $scope.equipo = data.data

      //console.log($scope.equipo[0].imagen);
      //var piv = 4;
      //var j = 0;
      //$scope.nuestroequipo = "";
      //for (var i = 0; i < Math.ceil(data.data.length / 4) ; i++) {
      //    switch (i) {
      //        case i:
      //            $scope.nuestroequipo += ' <div class="col-xs-12">';
      //            for (j; j < piv; j++) {
      //                $scope.nuestroequipo += '<div class="col-sm-6 col-md-3">' +
      //                                            '<img class="img-circle" src="' + API_PATH_MEDIA + data.data[j].imagen + '">' +
      //                                            '<h4>' + data.data[j].nombre + '</h4>' +
      //                                            '<h4>' + data.data[j].puesto + '</h4>' +
      //                                            '<a href="' + data.data[j].linkedin + '"><i class="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>'
      //                                         '</div>';
      //            }
      //            $scope.nuestroequipo += '</div><br/>';
      //            piv = piv + 4
      //            break;
      //        default:
      //            ""
      //    };
      //};
    });

    $scope.enviarContacto = function (ev) {
      contenidoFactory.ServiceContenido('contact/', 'POST', {

        "name": $scope.contacto.name,
        "email": $scope.contacto.email,
        "phone_number": $scope.contacto.phone_number,
        "comments": $scope.contacto.comments

      }).then(function (data) {

        //$scope.equipo = data.data
        contenidoFactory.mensaje(ev, "Datos enviados");
        //$mdToast.show($mdToast.simple().content("Datos enviados").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
      });
    };

  }]);
