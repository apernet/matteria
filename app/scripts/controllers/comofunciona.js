



'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('ComoFuncionaCtrl', ['$scope', 'API_PATH_MEDIA', 'API_PATH', 'contenidoFactory', '$location', '$timeout', '$q', '$http', '$window', '$mdSidenav', '$stateParams', function ($scope, API_PATH_MEDIA, API_PATH, contenidoFactory, $location, $timeout, $q, $http, $window, $mdSidenav, $stateParams) {
    $scope.filterInicio = new Date();
    $scope.filterFin = new Date();

    //console.log($scope.filterInicio);

    $scope.busqueda = {};
    $scope.sllider = [{}];
    $scope.vacantes = [{}];
    $scope.next = [{}];
    $scope.previous = [{}];
    $scope.pages = [{}];
    $scope.pagesinit = parseInt(1);
    $scope.comofunciona = [];
    $scope.intereses = [{}];
    $scope.paises = [{}];
    $scope.ctrl = {};
    $scope.tempProfesiones = [];
    $scope.professions = [];
    $scope.chips = [];
    $scope.descripcioquienesomos = "";
    $scope.tituloquienesomos = "";
    $scope.IsCiudad = false;
    $scope.API_PATH_MEDIA = API_PATH_MEDIA;
    $scope.idiomaLocal = $window.localStorage.idioma;
    $scope.filtro_h = "filtrar";
    $scope.filtro_p = "filtrar";
    $scope.filtro_f = "filtrar";
    $scope.next = [{}];
    $scope.previous = [{}];
    //$window.localStorage.if_url = false;

    $scope.filter_services = function (service) {
      $scope.vacantes = [];

      switch (service) {
        case 1:
          $scope.filtro_h = "filtrar_fijo";
          $scope.filtro_p = "filtrar";
          $scope.filtro_f = "filtrar";
          contenidoFactory.ServiceContenido('openings/?format=json', 'GET', '{}').then(function (data) {
            //console.log(Math.round((data.data.count - 10) / 10));
            for (var z = 0; z < data.data.results.length; z++) {
              if (data.data.results[z].opening_type == "Headhunting")
                $scope.vacantes.push(data.data.results[z]);
            }

            for (var i = 0; i < Math.round(data.data.count / 10); i++) {
              //console.log(i + 2);
              contenidoFactory.ServiceContenido('openings/?page=' + [i + 2] + '', 'GET', '{}').then(function (result) {
                console.log(result.data.results);
                if (result.status === 200) {
                  for (var zi = 0; zi < result.data.results.length; zi++) {
                    if (result.data.results[zi].opening_type === "Headhunting") {
                      $scope.vacantes.push(result.data.results[zi]);
                    }
                  }
                }
              });
            }

            $scope.pages = 1;
            $scope.next = null;
            $scope.previous = null;
            $scope.pagesinit = 1;
          });
          break;
        case 2:
          $scope.filtro_p = "filtrar_fijo";
          $scope.filtro_h = "filtrar";
          $scope.filtro_f = "filtrar";
          contenidoFactory.ServiceContenido('openings/?format=json', 'GET', '{}').then(function (data) {
            //console.log(Math.round((data.data.count - 10) / 10));
            for (var z = 0; z < data.data.results.length; z++) {
              if (data.data.results[z].opening_type == "Publicación + Filtro")
                $scope.vacantes.push(data.data.results[z]);
            }

            for (var i = 0; i < Math.round(data.data.count / 10); i++) {
              //console.log(i + 2);
              contenidoFactory.ServiceContenido('openings/?page=' + [i + 2] + '', 'GET', '{}').then(function (result) {
                console.log(result.data.results);
                if (result.status === 200) {
                  for (var zi = 0; zi < result.data.results.length; zi++) {
                    if (result.data.results[zi].opening_type === "Publicación + Filtro") {
                      $scope.vacantes.push(result.data.results[zi]);
                    }
                  }
                }
              });
            }

            $scope.pages = 1;
            $scope.next = null;
            $scope.previous = null;
            $scope.pagesinit = 1;
          });
          break;
        case 3:
          $scope.filtro_f = "filtrar_fijo";
          $scope.filtro_h = "filtrar";
          $scope.filtro_p = "filtrar";
          contenidoFactory.ServiceContenido('openings/?format=json', 'GET', '{}').then(function (data) {
            //console.log(Math.round((data.data.count - 10) / 10));
            for (var z = 0; z < data.data.results.length; z++) {
              if (data.data.results[z].opening_type == "Publicación")
                $scope.vacantes.push(data.data.results[z]);
            }

            for (var i = 0; i < Math.round(data.data.count / 10); i++) {
              //console.log(i + 2);
              contenidoFactory.ServiceContenido('openings/?page=' + [i + 2] + '', 'GET', '{}').then(function (result) {
                console.log(result.data.results);
                if (result.status === 200) {
                  for (var zi = 0; zi < result.data.results.length; zi++) {
                    if (result.data.results[zi].opening_type === "Publicación") {
                      $scope.vacantes.push(result.data.results[zi]);
                    }
                  }
                }
              });
            }

            $scope.pages = 1;
            $scope.next = null;
            $scope.previous = null;
            $scope.pagesinit = 1;
          });
          break;
        default:
      }

    }

    //$scope.calcular = function () {

    //  if ($window.localStorage.idioma == 'es_MX') {
    //    $scope.idiomaLocal = 'es_MX';
    //  }
    //  else {
    //    $scope.idiomaLocal = 'en_EN';
    //  }
    //  $scope.sllider = $scope.sllider;

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
      $scope.sllider = $scope.sllider;
    }

    $scope.$watch($scope.calcular);

    $scope.tipohorario = [
      {
        'name': 'Full-time',
        'id': 'Full-time'
      },
      {
        'name': 'Part-time',
        'id': 'Part-time'
      },
      {
        'name': 'Freelance',
        'id': 'Freelance'
      }
    ];

    $scope.hovertexto = function (obj) {
      $scope.tituloquienesomos = obj.titulo;
      $scope.descripcioquienesomos = obj.descripcion;
    }

    $scope.hovertextoout = function () {
      $scope.tituloquienesomos = "";
      $scope.descripcioquienesomos = "";
    }

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }

    //slider
    contenidoFactory.ServiceContenido('fcm/para-candidatos-info/?format=json', 'GET', '{}').then(function (data) {
      $scope.sllider = data.data
    });

    //Como funciona
    contenidoFactory.ServiceContenido('fcm/como-funciona-candidatos/?format=json', 'GET', '{}').then(function (data) {
      //console.log(data);
      $scope.color = ['#F26F31', '#0071BB', '#FFD440', '#EE4056', '#F26F31', '#0071BB'];
      for (var i = 0; i < data.data.length; i++) {
        $scope.comofunciona.push({
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

      //$scope.comofunciona = data.data

    });

    //Intereses clave
    contenidoFactory.ServiceContenido('catalogs/interests/?format=json', 'GET', '{}').then(function (data) {
      //console.log(data.data);
      $scope.intereses = data.data;
    });

    //Profesiones
    //contenidoFactory.ServiceContenido('catalogs/professions/?format=json', 'GET', '{}').then(function (data) {
    //    $scope.profesiones = data.data;
    //});

    //Paises
    contenidoFactory.ServiceContenido('catalogs/countries/?format=json', 'GET', '{}').then(function (data) {
      //console.log(data.data);
      $scope.paises = data.data;
    });

    //OCC
    contenidoFactory.ServiceContenido('catalogs/occ-time-intervals/?format=json', 'GET', '{}').then(function (data) {
      //console.log(data.data);
      $scope.intervals = data.data;
    });

    //Control del navegador atras
    // if ($window.history && $window.history.pushState) {
    //   alert("Clic atras");
    // }

    $scope.url = function (id) {
      //console.log(id);
      //$window.sessionStorage['sesionNext'] = $location.path();
      //console.log($window.sessionStorage['sesionNext']);
      $window.localStorage.url_return = $location.path();
     // console.log('$window.localStorage.url_return value: '+$window.localStorage.url_return);
      //console.log('$window.localStorage.url_vacante value: '+$window.localStorage.url_vacante);
      $location.url('/vacante/' + id + "/es");
    }
    //Busquedas
    //pais
    //$scope.filter = function () {
    //    console.log($scope.busqueda.filterPais);

    //    for (var i = 0; i < $scope.vacantes.length; i++) {
    //        if ($scope.vacantes[i].id == $scope.busqueda.filterPais)
    //            return $scope.vacantes[i];
    //        //console.log($scope.vacantes.push($scope.vacantes[i]));
    //    }
    //}

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

          for (var j = 0; j < $scope.professions.length; j++) {
            //$scope.tempProfesiones.push($scope.user.professions[j].id);
            for (var i = 0; i < $scope.profesiones.length; i++) {
              //$scope.tempData.push($scope.profesiones[i]);
              //$scope.profesiones.splice(i, i + 1);
              if ($scope.profesiones[i].id == $scope.professions[j].id) {
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
        $scope.professions.push({
          id: obj.id,
          name: obj.name
        });
        console.log($scope.professions);
        for (var j = 0; j < $scope.profesiones.length; j++) {

          if ($scope.profesiones[j].id == obj.id) {

            $scope.profesiones.splice(j, 1);
          }
        }
        console.log($scope.profesiones);
        document.getElementById('btn-' + obj.name).className = "chip-azul";
        document.getElementById('cb-' + obj.name).checked = false;
      }
      else {

        var index = $scope.tempProfesiones.indexOf(obj.id);
        $scope.tempProfesiones.splice(index, 1);
        $scope.professions.splice(index, 1);
        document.getElementById('cb-' + obj.name).checked = true;
        document.getElementById('btn-' + obj.name).className = "chip-gris";
      }

    }


    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;

    $scope.selectedVegetables = [];
    $scope.numberChips = [];
    $scope.numberChips2 = [];
    $scope.numberBuffer = '';

    $scope.transformChip = transformChip;
    $scope.autocompleteDemoRequireMatch = true;

    function transformChip(chip) {
      // If it is an object, it's already a known chip
      //console.log(chip);
      $scope.chips.push({
        id: chip.id,
        name: chip.name
      });
      console.log($scope.selectedVegetables);
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    /**
     * Search for vegetables.
     */
    function querySearch(query) {
      var results = query ? $scope.vegetables.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(vegetable) {
        return (vegetable._lowername.indexOf(lowercaseQuery) === 0 || vegetable._lowertype.indexOf(lowercaseQuery) === 0)
      };

    }

    function loadVegetables() {

      contenidoFactory.ServiceContenido('catalogs/professions/?format=json', 'GET', '{}').then(function (data) {
        //console.log(data.data);
        $scope.profesiones = data.data;
        $window.localStorage.setItem("savedData", JSON.stringify($scope.profesiones));
      });


      if (JSON.parse($window.localStorage.getItem("savedData")) == null) {
        contenidoFactory.ServiceContenido('catalogs/professions/?format=json', 'GET', '{}').then(function (data) {
          //console.log(data.data);
          //$scope.profesiones = data.data;
          $window.localStorage.setItem("savedData", JSON.stringify($scope.profesiones));
        });

      }
      else {
        //console.log(objects);

        //var veggies = objects;

        //console.log(veggies);

        return JSON.parse($window.localStorage.getItem("savedData")).map(function (veg) {
          veg._lowertype = veg.name.toString().toLowerCase();
          veg._lowername = veg.name.toLowerCase();
          return veg;

          //console.log(veg);
        });

      }

    }

    $scope.vegetables = loadVegetables();
    //Jornada
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

    //Intereses
    $scope.selected_interes = [];
    $scope.toggle_interes = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    };

    $scope.exists_interes = function (item, list) {
      return list.indexOf(item) > -1;
    };

    //Restar fecha 
    function mostrarFecha(days) {
      var milisegundos = parseInt(35 * 24 * 60 * 60 * 1000);

      var fecha = new Date();
      var day = fecha.getDate();
      // el mes es devuelto entre 0 y 11
      var month = fecha.getMonth() + 1;
      var year = fecha.getFullYear();

      //console.log("Fecha actual: " + day + "/" + month + "/" + year);

      //Obtenemos los milisegundos desde media noche del 1/1/1970
      var tiempo = fecha.getTime();
      //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
      milisegundos = parseInt(days * 24 * 60 * 60 * 1000);
      //Modificamos la fecha actual
      var total = fecha.setTime(tiempo + milisegundos);
      day = fecha.getDate();
      month = fecha.getMonth() + 1;
      year = fecha.getFullYear();

      //console.log("Fecha modificada: " + day + "/" + month + "/" + year);
      return year + "-" + month + "-" + day;
    }
   
    $scope.buscar_vacante = function (ev) {
      //console.log($scope.selectedVegetables);
      $scope.pagesinit = 1;
      var avaliability = "";
      var interests = "";
      var professions = "";
      var open_opening = "";

      for (var i = 0; i < $scope.selected.length; i++) {
        avaliability += '&avaliability=' + $scope.selected[i];
      }

      for (var i = 0; i < $scope.selected_interes.length; i++) {
        interests += '&interests=' + $scope.selected_interes[i];
      }

      for (var i = 0; i < $scope.selectedVegetables.length; i++) {
        professions += '&professions=' + $scope.selectedVegetables[i].id;
      }

      if ($scope.busqueda.filterNombre == undefined) { $scope.busqueda.filterNombre = "" }
      if ($scope.busqueda.filterPais == undefined) { $scope.busqueda.filterPais = "" }
      if ($scope.busqueda.filterciudad == undefined) { $scope.busqueda.filterciudad = "" }
      if ($scope.busqueda.filterdesdesalario == undefined) { $scope.busqueda.filterdesdesalario = "" }
      if ($scope.busqueda.filterhastasalario == undefined) { $scope.busqueda.filterhastasalario = "" }
      if ($scope.busqueda.filterAnosExperencia == undefined) { $scope.busqueda.filterAnosExperencia = "" }
      if ($scope.busqueda.filterinervalo == undefined) { open_opening = ""; } else { open_opening = mostrarFecha(-$scope.busqueda.filterinervalo); }

      if ($scope.busqueda.filterNombre != "" || $scope.busqueda.filterPais != "" || $scope.busqueda.filterciudad != "" || $scope.busqueda.filterdesdesalario != "" || $scope.busqueda.filterhastasalario != "" || $scope.busqueda.filterAnosExperencia != "" || open_opening != "" || avaliability != "" || interests != "" || professions != "") {
        if($scope.busqueda.filterPais == "" ) {
   
          contenidoFactory.ServiceContenido('openings/?salary_min=' + $scope.busqueda.filterdesdesalario + '&salary_max=' + $scope.busqueda.filterhastasalario + '&years_experience=' + $scope.busqueda.filterAnosExperencia + avaliability + interests + professions + '&open_opening=' + open_opening + '&search=' + $scope.busqueda.filterNombre, 'GET', '{}').then(function (data) {
            $scope.vacantes = data.data.results;
            $scope.pages = data.data.pages;
            $scope.pagesinit = $scope.pagesinit;
            $scope.next = data.data.next;
            $scope.previous = data.data.previous;

            localStorage.setItem('pagesinit', parseInt($scope.pagesinit) + 1);
            localStorage.setItem("results", JSON.stringify((data.data.results)));
            localStorage.setItem('pages', data.data.pages);
            localStorage.setItem('next', data.data.next);
            localStorage.setItem('previous', data.data.previous);
          });
        }
        //console.log($scope.busqueda.filterNombre + '---' + $scope.busqueda.filterPais);
        if($scope.busqueda.filterciudad != "" ) {
          // console.log("Pais: "+$scope.busqueda.filterPais + " Ciudad: " +$scope.busqueda.filterciudad);
          // console.log("Solo buscas por pais y ciudad");
          
          console.log('openings/?country=' + $scope.busqueda.filterPais + '&city=' + $scope.busqueda.filterciudad + '&salary_min=' + $scope.busqueda.filterdesdesalario + '&salary_max=' + $scope.busqueda.filterhastasalario + '&years_experience=' + $scope.busqueda.filterAnosExperencia + avaliability + interests + professions + '&open_opening=' + open_opening + '&search=' + $scope.busqueda.filterNombre);

          contenidoFactory.ServiceContenido('openings/?country=' + $scope.busqueda.filterPais + '&city=' + $scope.busqueda.filterciudad + '&salary_min=' + $scope.busqueda.filterdesdesalario + '&salary_max=' + $scope.busqueda.filterhastasalario + '&years_experience=' + $scope.busqueda.filterAnosExperencia + avaliability + interests + professions + '&open_opening=' + open_opening + '&search=' + $scope.busqueda.filterNombre, 'GET', '{}').then(function (data) {
            $scope.vacantes = data.data.results;
            $scope.pages = data.data.pages;
            $scope.pagesinit = $scope.pagesinit;
            $scope.next = data.data.next;
            $scope.previous = data.data.previous;

            localStorage.setItem('pagesinit', parseInt($scope.pagesinit) + 1);
            localStorage.setItem("results", JSON.stringify((data.data.results)));
            localStorage.setItem('pages', data.data.pages);
            localStorage.setItem('next', data.data.next);
            localStorage.setItem('previous', data.data.previous);
          });
          
        } else {

          console.log('openings/?country=' + $scope.busqueda.filterPais+ '&salary_min=' + $scope.busqueda.filterdesdesalario + '&salary_max=' + $scope.busqueda.filterhastasalario + '&years_experience=' + $scope.busqueda.filterAnosExperencia + avaliability + interests + professions + '&open_opening=' + open_opening + '&search=' + $scope.busqueda.filterNombre);

          contenidoFactory.ServiceContenido('openings/?country=' + $scope.busqueda.filterPais + '&salary_min=' + $scope.busqueda.filterdesdesalario + '&salary_max=' + $scope.busqueda.filterhastasalario + '&years_experience=' + $scope.busqueda.filterAnosExperencia + avaliability + interests + professions + '&open_opening=' + open_opening + '&search=' + $scope.busqueda.filterNombre, 'GET', '{}').then(function (data) {
            console.log(data.data.results);
            $scope.vacantes = data.data.results;
            $scope.pages = data.data.pages;
            $scope.pagesinit = $scope.pagesinit;
            $scope.next = data.data.next;
            $scope.previous = data.data.previous;

            localStorage.setItem('pagesinit', parseInt($scope.pagesinit) + 1);
            localStorage.setItem("results", JSON.stringify((data.data.results)));
            localStorage.setItem('pages', data.data.pages);
            localStorage.setItem('next', data.data.next);
            localStorage.setItem('previous', data.data.previous);
          });

        }
      }
      else {
        contenidoFactory.mensaje(ev, "Elige un parámetro de búsqueda");
      }
    }

    $scope.borrar_filtros = function () {
      contenidoFactory.ServiceContenido('openings/?format=json', 'GET', '{}').then(function (data) {

        $scope.filtro_h = "filtrar";
        $scope.filtro_p = "filtrar";
        $scope.filtro_f = "filtrar";
        $scope.selectedVegetables = [];
        $scope.selected = [];
        $scope.selected_interes = [];
        $scope.busqueda = {};
        $scope.vacantes = data.data.results;
        $scope.pages = data.data.pages;
        $scope.pagesinit = 1;
        $scope.next = data.data.next;
        $scope.previous = data.data;

      });
    }

    $scope.selectEstado = function () {
      //console.log("OK");
      if ($scope.busqueda.filterPais != undefined || $scope.busqueda.filterPais != "") {
        $scope.estados = [{}];
        contenidoFactory.ServiceContenido('catalogs/countries/' + $scope.busqueda.filterPais + '/states/?format=json', 'GET', '{}').then(function (data) {
          console.log(data.data);
          $scope.estados = data.data;

          if ($scope.estados == "") {
            $scope.IsCiudad = false;
            //$scope.user.city = "";
            //if ($scope.user.city != "") {
            //    $scope.user.city = $scope.user.city;
            //}
            //else {

            //}
          }
          else {
            $scope.IsCiudad = true;
          }
        });
      }
    }

    var URLactual = window.location;
    console.log(URLactual.pathname);
    //Vacantes
    if (!localStorage.getItem('ingreso')) {
      contenidoFactory.ServiceContenido('openings/?format=json', 'GET', '{}').then(function (data) {
        console.log(data.data.results);
        $scope.vacantes = data.data.results;
        $scope.pages = data.data.pages;
        $scope.next = data.data.next;
        $scope.previous = data.data.previous;

        localStorage.setItem('pagesinit', 1);
        localStorage.setItem("results", JSON.stringify((data.data.results)));
        localStorage.setItem('pages', data.data.pages);
        localStorage.setItem('next', data.data.next);
        localStorage.setItem('previous', data.data.previous);
      });
      localStorage.setItem('ingreso', 1);

    } else {
      $scope.vacantes = JSON.parse(localStorage.getItem("results"));
      $scope.pages = localStorage.getItem('pages');
      $scope.pagesinit = localStorage.getItem('pagesinit');
      $scope.next = localStorage.getItem('next');
      $scope.previous = localStorage.getItem('previous');

      //localStorage.clear();
    }    

    $scope.nextPage = function () {

      $http({
        url: $scope.next,
        method: 'GET',
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
      }).then(function successCallback(data) {
        $scope.vacantes = data.data.results;
        $scope.pages = data.data.pages;
        localStorage.setItem('pagesinit', parseInt($scope.pagesinit) + 1);
        $scope.pagesinit = parseInt($scope.pagesinit) + 1;
        $scope.next = data.data.next;
        $scope.previous = data.data.previous;

        localStorage.setItem("results", JSON.stringify((data.data.results)));
        localStorage.setItem('pages', data.data.pages);        
        localStorage.setItem('next', data.data.next);
        localStorage.setItem('previous', data.data.previous);

        
      });

      $window.scrollTo(0, 0);
    }

    $scope.beforePage = function () {

      $http({
        url: $scope.previous,
        method: 'GET',
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
      }).then(function successCallback(data) {
        $scope.vacantes = data.data.results;
        $scope.pages = data.data.pages;
        localStorage.setItem('pagesinit', parseInt($scope.pagesinit) - 1);
        $scope.pagesinit = parseInt($scope.pagesinit) - 1;
        $scope.next = data.data.next;
        $scope.previous = data.data.previous;

        localStorage.setItem("results", JSON.stringify((data.data.results)));
        localStorage.setItem('pages', data.data.pages);        
        localStorage.setItem('next', data.data.next);
        localStorage.setItem('previous', data.data.previous);
      });
      $window.scrollTo(0, 0);
    }
  }]);
