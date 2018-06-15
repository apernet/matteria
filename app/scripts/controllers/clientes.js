'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('ClientesCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', '$stateParams', function ($scope, API_PATH_MEDIA, contenidoFactory, $window, $stateParams) {

    $scope.clientesprivados = [{}];
    $scope.clientescivil = [{}];
    $scope.slider = [{}];
    $scope.API_PATH_MEDIA = API_PATH_MEDIA;
    //$scope.idiomaLocal = $window.localStorage.idioma;

    //if ($stateParams.idioma == 'en') {
    //    $window.localStorage.idioma = 'en_EN';
    //    $scope.idiomaLocal = 'en_EN';
    //    //$window.location.assign('/#!/en');
    //}
    //else {
    //    $window.localStorage.idioma = 'es_MX';
    //    $scope.idiomaLocal = 'es_MX';
    //    //$window.location.assign('/#!/es');
    //}

    //$scope.calcular = function () {

    //  if ($window.localStorage.idioma == 'es_MX') {
    //    $scope.idiomaLocal = 'es_MX';
    //  }
    //  else {
    //    $scope.idiomaLocal = 'en_EN';
    //  }
    //  $scope.slider = $scope.slider;
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
      $scope.slider = $scope.slider;
    }

    $scope.$watch($scope.calcular);

    //Slider
    contenidoFactory.ServiceContenido('fcm/nuestros-clientes-info/?format=json', 'GET', '{}').then(function (data) {
      $scope.slider = data.data
    });

    //Clientes privados
    contenidoFactory.ServiceContenido('fcm/nuestros-clientes/?format=json', 'GET', '{}').then(function (data) {
      $scope.clientesprivados = data.data;
      //for (var x = 0; x < data.data.length; x++) {
      //    if (data.data[x].sector == 'Privado') {
      //        $scope.clientesprivados.push(data.data[x]);
      //    }
      //}
      console.log($scope.clientesprivados);
      //var piv = 7;
      //var j = 1;
      //$scope.clientesprivados1 = "";

      //for (var i = 0; i < Math.round($scope.clientesprivados.length / 6) ; i++) {
      //    switch (i) {
      //        case i:
      //            $scope.clientesprivados1 += ' <div class="col-xs-12">';
      //            for (j; j < piv; j++) {
      //                $scope.clientesprivados1 += '<div class="col-xs-2" >' +
      //                                            '<img class="img-responsive" src="' + API_PATH_MEDIA + $scope.clientesprivados[j].imagen + '">' +
      //                                            '<h4>' + $scope.clientesprivados[j].empresa + '</h4>' +
      //                                            '</div>';
      //            }
      //            $scope.clientesprivados1 += '</div><br/><br/>';
      //            piv = piv + 6
      //            break;
      //        default:
      //            ""
      //    };
      //};
    });

    //Clientes Civiles
    //contenidoFactory.ServiceContenido('fcm/nuestros-clientes/?format=json', 'GET', '{}').then(function (data) {
    //    //var piv = 7;
    //    //var z = 1;
    //    //$scope.clientesciviles = "";

    //    //for (var x = 0; x < data.data.length; x++) {
    //    //    if (data.data[x].sector == 'Civil') {
    //    //        $scope.clientescivil.push(data.data[x])
    //    //    }
    //    //}

    //    //for (var y = 0; y < Math.round($scope.clientescivil.length / 6) ; y++) {
    //    //    switch (y) {
    //    //        case y:
    //    //            $scope.clientesciviles += ' <div class="col-xs-12">';
    //    //            for (z; z < piv; z++) {
    //    //                $scope.clientesciviles += '<div class="col-xs-2" >' +
    //    //                                            '<img class="img-responsive" src="' + API_PATH_MEDIA + $scope.clientescivil[z].imagen + '">' +
    //    //                                            '<h4>' + $scope.clientescivil[z].empresa + '</h4>' +
    //    //                                            '</div>';
    //    //            }
    //    //            $scope.clientesciviles += '</div><br/><br/>';
    //    //            piv = piv + 6
    //    //            break;
    //    //        default:
    //    //            ""
    //    //    };
    //    //};
    //});

    $scope.panesB = [
      {
        id: 'pane-1b',
        header: 'Pane 1',
        content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.',
        isExpanded: true
      },
      {
        id: 'pane-2b',
        header: 'Pane 2',
        content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.',
        isExpanded: true
      },
      {
        id: 'pane-3b',
        header: 'Pane 3',
        content: 'Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.',

        subpanes: [
          {
            id: 'subpane-1b',
            header: 'Subpane 1',
            content: 'Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.'
          },
          {
            id: 'subpane-2b',
            header: 'Subpane 2 (disabled)',
            content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Quisque lorem tortor fringilla sed, vestibulum id.',
            isDisabled: true
          }
        ]
      }
    ];

    $scope.expandCallback = function (index, id) {
      console.log('expand:', index, id);
    };

    $scope.collapseCallback = function (index, id) {
      console.log('collapse:', index, id);
    };

    $scope.$on('accordionA:onReady', function () {
      console.log('accordionA is ready!');
    });

  }]);
