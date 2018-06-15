angular.module('tcsGruntApp')
  .controller('VerPostulantesCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window) {

      $scope.rankingmodel = "";
      $scope.postulantes = [{}];
      $scope.newpostulante = [];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;

      //Postulaicones
      contenidoFactory.ServiceContenido('openings/' + $stateParams.id + '/candidates/?format=json', 'GET', '{}').then(function (data) {
          console.log(data.data);
          $scope.postulantes = data.data
          //for (var i = 0; i < $scope.postulantes.length; i++) {
          //    if ($scope.postulantes[i].ranking == 0) {
          //        console.log($scope.postulantes[i].ranking);
          //        $scope.newpostulante.push({
          //            candidate: $scope.postulantes[i].candidate,
          //            id: $scope.postulantes[i].id,
          //            ranking: -1
          //        });

          //        //var index = $scope.postulantes.indexOf($scope.postulantes[i].id);
          //        //$scope.postulantes.splice(index, 1);
          //        //console.log($scope.postulantes);
          //    }
          //    $scope.newpostulante.push($scope.postulantes[i]);
          //    //$scope.postulantes.push($scope.newpostulante[i]);
          //}
          //console.log($scope.newpostulante);
          //console.log($scope.postulantes);
          contenidoFactory.ServiceContenido('openings/' + $stateParams.id + '/?format=json', 'GET', '{}').then(function (data) {
              $scope.infopostulante = data.data
              console.log($scope.infopostulante);
          });
      });



      $scope.rateFunction = function (rating, postulantes) {
          console.log(postulantes.id);
          contenidoFactory.ServicePerfil('openings/applications/' + postulantes.id + '/edit/', 'PUT',
              {
                  ranking: rating
              }).then(function (data) {
                  console.log(data);

              });
      };
  }]);

