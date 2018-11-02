'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('PerfilPostulanteCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', 'focus', '$stateParams', '$window', '$mdDialog', 'Images', '$mdToast', '$templateCache', function ($scope, API_PATH_MEDIA, contenidoFactory, focus, $stateParams, $window, $mdDialog, Images, $mdToast, $templateCache) {

    $scope.actual_job = false;
    $scope.actual_volunteer = false;
    $scope.actual_student = false;
    $scope.IsCiudad = true;
    $scope.IsCiudadEsperiencia = true;

    $scope.tempProfesiones = [];
    $scope.tempIntereses = [];
    $scope.tempSectores = [];
    $scope.tempAreas = [];
    $scope.datosgenerales = [{}];
    $scope.user = {};
    $scope.exp_lab = [];
    $scope.paises = [{}];
    $scope.agregarExpericia = false;
    $scope.agregarVoluntariado = false;
    $scope.agregarEducacion = false;
    $scope.agregarIdioma = false;
    $scope.isImage = true;
    $scope.API_PATH_MEDIA = API_PATH_MEDIA;
    $scope.classazul = 'dp-btn-boton-interes-exp';
    $scope.classblanco = 'dp-btn-boton-interes-exp-sin';
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.crop = false;
    $scope.currentLocation = window.location.host;
    $scope.ayudasexo = " ¿Por qué te hacemos esta pregunta? Por que queremos conocer a nuestra comunidad de postulantes, defendiendo los avances a nivel de diversidad y tolerancia que con mucho esfuerzo hemos ido logrando como sociedad. Esto por ningún motivo representa un factor de discriminación postiva o negativa, más allá de si tu perfil se ajusta o no a la vacante requerida.";
    $scope.ph = false;
    $scope.idiomaLocal = $window.localStorage.idioma;

    candidato();

    //Imagen
    //$scope.setFile = function (element) {
    //    $scope.isImage = false;
    //    //element.files[0]);
    //    $scope.currentFile = element.files[0];
    //    $scope.userAvatar = element.files[0];
    //    var reader = new FileReader();

    //    reader.onload = function (event) {
    //        $scope.image_source = event.target.result;
    //        ////$scope.image_source);
    //        $scope.$apply();

    //    }
    //    // when the file is read it triggers the onload event above.
    //    reader.readAsDataURL(element.files[0]);
    //}


    var handleFileSelect = function (evt) {
      $scope.crop = true;
      var file = evt.currentTarget.files[0];
      //$scope.userAvatar = evt.delegateTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        ////evt);
        $scope.$apply(function ($scope) {
          $scope.myImage = evt.target.result;
          $scope.userimg = evt.target.result.split(',')
          $scope.userAvatar = $scope.userimg[1];
          $scope.userExtencion = evt.target.result.split(',');
          $scope.tipoimg = $scope.userExtencion[0].split('/')[1].split(';')[0];

          ////$scope.userExtencion[0].split('/')[1].split(';')[0]);
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

    $scope.setimagen = function () {
      $scope.crop = false;
      $scope.isImage = false;
    }

    $scope.setimagencancelar = function () {
      $scope.crop = false;
      $scope.isImage = true;
    }

    //stilo     

    //for (var i = 0; $scope.user.professions.length < 0; i++) {
    //    $scope.tempProfesiones.push($scope.user.professions[i].id);
    //}     

    //Experiencia
    $scope.viewexperiencia = function () {
      $scope.experties = {};
      focus('experties.name');
      $scope.agregarExpericia = true;
      $scope.btnAgregar = true;
      $scope.btnEditar = false;
    };

    $scope.cancelarexperiencia = function () {
      $scope.agregarExpericia = false;
    }

    $scope.editexperiencia = function (experiencia) {
      //console.log(experiencia);
      $scope.experties = {};
      focus('experties.name');
      $scope.experties = experiencia;
      $scope.actual_job = experiencia.actual_job;
      $scope.selectPaisExperiencia(experiencia.country)
      $scope.agregarExpericia = true;
      $scope.btnAgregar = false;
      $scope.btnEditar = true;

      ////experiencia);
    }

    $scope.borrarexperiencia = function (ev, experiencia) {
      var confirm = $mdDialog.confirm(
        {
          targetEvent: ev,
          template: '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
            '<md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
            '<div class="md-dialog-content-body"><h4 class="negrita">¿Estás seguro que deseas borrar este ítem?</h4></div>' +
            '</md-dialog-content>' +
            '<md-dialog-actions>' +
            '<md-button ng-click="dialog.hide()" class="md-primary md-confirm-button">Si</md-button>' +
            '<md-button ng-click="dialog.abort()" class="md-primary md-cancel-button">No</md-button>' +
            '</md-dialog-actions>' +
            '</md-dialog>'
        });
      //.title('Borrar Experiencia Laboral?')
      //.textContent('Estas seguro que deseas borrar este item.')
      //.ariaLabel('')
      //.targetEvent(ev)
      //.cancel('No')
      //.ok('Si');                
      ////confirm);
      $mdDialog.show(confirm).then(function () {
        contenidoFactory.ServicePerfil('candidates/wse/' + experiencia.id + '/delete/', 'DELETE', {}).then(function (data) {
          //data);
          candidato();
        });
      });

    }

    $scope.editarExperiencia = function () {
      //console.log($scope.experties.city);
      //$scope.experties.work_to == undefined || $scope.experties.work_to == "" ? $scope.experties.work_to = null : $scope.experties.work_to = $scope.experties.work_to;
      if ($scope.actual_job == true) {
        $scope.experties.work_to_month = null;
        $scope.experties.work_to_year = null;
      }
      contenidoFactory.ServicePerfil('candidates/wse/' + $scope.experties.id + '/edit/', 'PUT', {
        name: $scope.experties.name,
        title: $scope.experties.title,
        country: $scope.experties.country,
        city: $scope.experties.cities,
        work_from_month: $scope.experties.work_from_month,
        work_from_year: $scope.experties.work_from_year,
        work_to_month: $scope.experties.work_to_month,
        work_to_year: $scope.experties.work_to_year,
        actual_job: $scope.actual_job,
        description: $scope.experties.description,
        positive_impact: $scope.experties.positive_impact,
        candidate: $window.localStorage.id_candidate

      }).then(function (data) {
        //console.log(data);
        $scope.agregarExpericia = false;
        candidato();
      });
    }

    $scope.agregarExpericenia = function () {
      $scope.experties.work_to == undefined || $scope.experties.work_to == "" ? $scope.experties.work_to = null : $scope.experties.work_to = $scope.experties.work_to;
      ////$scope.experties.work_to);
      if ($scope.actual_job == true) {
        $scope.experties.work_to_month = null;
        $scope.experties.work_to_year = null;
      }

      contenidoFactory.ServicePerfil('candidates/wse/create/', 'POST', {
        name: $scope.experties.name,
        title: $scope.experties.title,
        country: $scope.experties.country,
        city: $scope.experties.cities,
        work_from_month: $scope.experties.work_from_month,
        work_from_year: $scope.experties.work_from_year,
        work_to_month: $scope.experties.work_to_month,
        work_to_year: $scope.experties.work_to_year,
        actual_job: $scope.actual_job,
        description: $scope.experties.description,
        positive_impact: $scope.experties.positive_impact,
        candidate: $window.localStorage.id_candidate

      }).then(function (data) {
        //data);
        $scope.agregarExpericia = false;
        candidato();
      });
    }

    //Voluntariado
    $scope.viewvoluntariado = function () {
      $scope.volunteering = {};
      focus('volunteering.name');
      $scope.agregarVoluntariado = true;
      $scope.btnAgregar = true;
      $scope.btnEditar = false;
    }

    $scope.cancelarvoluntariado = function () {
      $scope.agregarVoluntariado = false;
    }

    $scope.editvoluntariado = function (voluntariado) {
      //voluntariado);

      focus('volunteering.name');
      $scope.volunteering = voluntariado;
      $scope.volunteering.volunteer_froms = new Date(voluntariado.volunteer_from);
      $scope.volunteering.volunteer_tos = new Date(voluntariado.volunteer_to);
      $scope.actual_volunteer = voluntariado.actual_volunteer;
      $scope.volunteering.causeid = voluntariado.cause.id;
      $scope.agregarVoluntariado = true;
      $scope.btnAgregar = false;
      $scope.btnEditar = true;
    }

    $scope.borrarvoluntariado = function (ev, voluntariado) {
      ////voluntariado.id);
      var confirm = $mdDialog.confirm({
        targetEvent: ev,
        template: '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
          '<md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
          '<div class="md-dialog-content-body"><h5 class="negrita">¿Estás seguro que deseas borrar este ítem?</h5></div>' +
          '</md-dialog-content>' +
          '<md-dialog-actions>' +
          '<md-button ng-click="dialog.hide()" class="md-primary md-confirm-button">Si</md-button>' +
          '<md-button ng-click="dialog.abort()" class="md-primary md-cancel-button">No</md-button>' +
          '</md-dialog-actions>' +
          '</md-dialog>'
      })
      //      .title('Borrar Voluntariado?')
      //      .textContent('Estas seguro que deseas borrar este item.')
      //      .ariaLabel('')
      //      .targetEvent(ev)
      //      .ok('Si')
      //      .cancel('No');
      ////confirm);
      $mdDialog.show(confirm).then(function () {
        contenidoFactory.ServicePerfil('candidates/ve/' + voluntariado.id + '/delete/', 'DELETE', {}).then(function (data) {
          //data);
          candidato();
        });
      });

    }

    $scope.agregarVoluntariados = function () {
      //$scope.volunteering.volunteer_to == undefined || $scope.volunteering.volunteer_to == "" ? $scope.volunteering.volunteer_to = null : $scope.volunteering.volunteer_to = $scope.volunteering.volunteer_to;
      if ($scope.actual_volunteer == true) {
        $scope.volunteering.volunteer_to_month = null;
        $scope.volunteering.volunteer_to_year = null;
      }
      contenidoFactory.ServicePerfil('candidates/ve/create/', 'POST', {
        "name": $scope.volunteering.name,
        "volunteer_function": $scope.volunteering.volunteer_function,
        "cause": $scope.user.causa,
        "volunteer_from_month": $scope.volunteering.volunteer_from_month,
        "volunteer_from_year": $scope.volunteering.volunteer_from_year,
        "volunteer_to_month": $scope.volunteering.volunteer_to_month,
        "volunteer_to_year": $scope.volunteering.volunteer_to_year,
        "actual_volunteer": $scope.actual_volunteer,
        "description": $scope.volunteering.volunteer_function,
        "candidate": $window.localStorage.id_candidate

      }).then(function (data) {
        $scope.agregarVoluntariado = false;
        candidato();
      });
    }

    $scope.editarVoluntariados = function () {
      //$scope.volunteering.volunteer_to == undefined || $scope.volunteering.volunteer_to == "" ? $scope.volunteering.volunteer_to = null : $scope.volunteering.volunteer_to = $scope.volunteering.volunteer_to;
      if ($scope.actual_volunteer == true) {
        $scope.volunteering.volunteer_to_month = null;
        $scope.volunteering.volunteer_to_year = null;
      }
      contenidoFactory.ServicePerfil('candidates/ve/' + $scope.volunteering.id + '/edit/', 'PUT', {
        "name": $scope.volunteering.name,
        "volunteer_function": $scope.volunteering.volunteer_function,
        "cause": $scope.user.causa,
        "volunteer_from_month": $scope.volunteering.volunteer_from_month,
        "volunteer_from_year": $scope.volunteering.volunteer_from_year,
        "volunteer_to_month": $scope.volunteering.volunteer_to_month,
        "volunteer_to_year": $scope.volunteering.volunteer_to_year,
        "actual_volunteer": $scope.actual_volunteer,
        "description": $scope.volunteering.description,
        "candidate": $window.localStorage.id_candidate

      }).then(function (data) {
        $scope.agregarVoluntariado = false;
        candidato();
      });
    }

    //Educacion
    $scope.vieweducacion = function () {
      $scope.education = {};
      focus('education.institution');
      $scope.agregarEducacion = true;
      $scope.btnAgregar = true;
      $scope.btnEditar = false;
    }

    $scope.cancelareducacion = function () {
      $scope.agregarEducacion = false;
    }

    $scope.editeducacion = function (educacion) {
      //educacion);
      focus('education.institution');
      $scope.education = educacion;
      $scope.education.studied_froms = new Date(educacion.studied_from);
      $scope.education.studied_tos = new Date(educacion.studied_to);
      $scope.education.disiplinaid = educacion.discipline.id;
      $scope.agregarEducacion = true;
      $scope.actual_student = educacion.actual_student;
      $scope.btnAgregar = false;
      $scope.btnEditar = true;
    }

    $scope.borrareducacion = function (ev, educacion) {
      var confirm = $mdDialog.confirm(
        {
          targetEvent: ev,
          template: '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
            '<md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
            '<div class="md-dialog-content-body"><h5 class="negrita">¿Estás seguro que deseas borrar este ítem?</h5></div>' +
            '</md-dialog-content>' +
            '<md-dialog-actions>' +
            '<md-button ng-click="dialog.hide()" class="md-primary md-confirm-button">Si</md-button>' +
            '<md-button ng-click="dialog.abort()" class="md-primary md-cancel-button">No</md-button>' +
            '</md-dialog-actions>' +
            '</md-dialog>'
        })
      //.title('Borrar Educación?')
      //.textContent('Estas seguro que deseas borrar este item.')
      //.ariaLabel('')
      //.targetEvent(ev)
      //.ok('Si')
      //.cancel('No');

      $mdDialog.show(confirm).then(function () {
        contenidoFactory.ServicePerfil('candidates/education/' + educacion.id + '/delete/', 'DELETE', {}).then(function (data) {
          //data);
          candidato();
        });
      });
    }

    $scope.agregarEducations = function () {
      //$scope.education.studied_to == undefined || $scope.education.studied_to == "" ? $scope.education.studied_to = null : $scope.education.studied_to = $scope.education.studied_to;
      if ($scope.actual_student == true) {
        $scope.education.studied_to_month = null;
        $scope.education.studied_to_year = null;
      }
      contenidoFactory.ServicePerfil('candidates/education/create/', 'POST', {
        "institution": $scope.education.institution,
        "discipline": $scope.education.discipline,
        "grade": $scope.education.grade,
        "studied_from_month": $scope.education.studied_from_month,
        "studied_from_year": $scope.education.studied_from_year,
        "studied_to_month": $scope.education.studied_to_month,
        "studied_to_year": $scope.education.studied_to_year,
        "actual_student": $scope.actual_student,
        "description": $scope.education.description,
        "group_and_activities": $scope.education.group_and_activities,
        "candidate": $window.localStorage.id_candidate

      }).then(function (data) {
        ////data);
        $scope.agregarEducacion = false;
        candidato();
      });
    }

    $scope.editarEducationes = function () {
      //$scope.education.studied_to == undefined || $scope.education.studied_to == "" ? $scope.education.studied_to = null : $scope.education.studied_to = $scope.education.studied_to;
      if ($scope.actual_student == true) {
        $scope.education.studied_to_month = null;
        $scope.education.studied_to_year = null;
      }
      contenidoFactory.ServicePerfil('candidates/education/' + $scope.education.id + '/edit/', 'PUT', {
        "institution": $scope.education.institution,
        "discipline": $scope.education.discipline,
        "grade": $scope.education.grade,
        "studied_from_month": $scope.education.studied_from_month,
        "studied_from_year": $scope.education.studied_from_year,
        "studied_to_month": $scope.education.studied_to_month,
        "studied_to_year": $scope.education.studied_to_year,
        "actual_student": $scope.actual_student,
        "description": $scope.education.description,
        "group_and_activities": $scope.education.group_and_activities,
        "candidate": $window.localStorage.id_candidate

      }).then(function (data) {
        $scope.agregarEducacion = false;
        candidato();
      });
    }

    //Idioma 
    $scope.viewidioma = function () {
      $scope.language = {};
      $scope.agregarIdioma = true;
      $scope.btnAgregar = true;
      $scope.btnEditar = false;
    }

    $scope.cancelaridioma = function () {

      $scope.agregarIdioma = false;
    }

    $scope.editidioma = function (idioma) {
      //idioma);
      focus('user.idioma');
      $scope.language = idioma;
      $scope.agregarIdioma = true
      $scope.btnAgregar = false;
      $scope.btnEditar = true;
    }

    $scope.borraridioma = function (ev, idioma) {
      var confirm = $mdDialog.confirm()
        .title('Borrar Idioma?')
        .textContent('Estas seguro que deseas borrar este ítem.')
        .ariaLabel('')
        .targetEvent(ev)
        .ok('Si')
        .cancel('No');

      $mdDialog.show(confirm).then(function () {
        contenidoFactory.ServicePerfil('candidates/languages/' + idioma.id + '/delete/', 'DELETE', {}).then(function (data) {
          //data);
          candidato();
        });
      });
    }

    $scope.agregarIdiomas = function () {
      contenidoFactory.ServicePerfil('candidates/languages/create/', 'POST', {
        "language": $scope.user.idioma,
        "oral_level": $scope.language.oral_level,
        "written_level": $scope.language.written_level,
        "candidate": $window.localStorage.id_candidate

      }).then(function (data) {
        $scope.agregarIdioma = false;
        candidato();
      });
    }

    $scope.editarIdiomas = function () {
      ////$scope.language);
      ////$scope.user.idioma);
      ////$scope.language.id);
      ////$scope.language.oral_level);
      ////$scope.language.written_leve);
      contenidoFactory.ServicePerfil('candidates/languages/' + $scope.language.id + '/edit/', 'PUT', {
        "language": $scope.user.idioma,
        "oral_level": $scope.language.oral_level,
        "written_level": $scope.language.written_level,
        "candidate": $window.localStorage.id_candidate

      }).then(function (data) {
        $scope.agregarIdioma = false;
        candidato();
      });
    }

    //Paises
    $scope.selectPais = function (paisId) {
      //paisId);
      if (paisId == null || paisId == "") {
        contenidoFactory.ServiceContenido('catalogs/countries/?format=json', 'GET', '{}').then(function (data) {
          //data.data);
          $scope.paises = data.data;
        });
      }
      else {
        contenidoFactory.ServiceContenido('catalogs/countries/?format=json', 'GET', '{}').then(function (data) {
          //data.data);
          $scope.paises = data.data;
          contenidoFactory.ServiceContenido('catalogs/countries/' + paisId + '/states/?format=json', 'GET', '{}').then(function (data) {
            ////data.data);
            setTimeout($scope.estados = data.data, 2000);


          });

        });
      }

    }

    $scope.selectEstado = function () {
      //"OK");
      //$scope.estados = [{}];
      //$scope.user.city = "";
      contenidoFactory.ServiceContenido('catalogs/countries/' + $scope.user.pais + '/states/?format=json', 'GET', '{}').then(function (data) {
        //data.data);
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


    $scope.selectPaisExperiencia = function (paisId) {
      contenidoFactory.ServiceContenido('catalogs/countries/' + paisId + '/states/?format=json', 'GET', '{}').then(function (data) {
        //data.data);
        $scope.estadosExperiencia = data.data;

      });
    }

    $scope.selectEstadoExperiencia = function () {
      ////"OK");
      if ($scope.experties.country == null || $scope.experties.country == "" || $scope.experties.country == undefined) {

      }
      else {
        $scope.estadosExperiencia = [{}];
        //console.log($scope.experties.country);
        contenidoFactory.ServiceContenido('catalogs/countries/' + $scope.experties.country + '/states/?format=json', 'GET', '{}').then(function (data) {
          //data.data);
          $scope.estadosExperiencia = data.data;

          if ($scope.estadosExperiencia == "") {
            $scope.IsCiudadEsperiencia = false;
            //$scope.user.city = "";
            //if ($scope.user.city != "") {
            //    $scope.user.city = $scope.user.city;
            //}
            //else {

            //}
          }
          else {
            $scope.IsCiudadEsperiencia = true;
          }
        });
      }

    }

    //candidato
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

    function candidato() {
      //console.log($window.localStorage.avatar);
      contenidoFactory.ServicePerfil('candidates/me/', 'GET', '{}').then(function (data) {
        //data.country);

        if (data.country == null || data.country == "") {
          $scope.selectPais(null);
        }
        else {
          $scope.selectPais(data.country.id);
        }
        $scope.user = data;
        //$scope.exp_lab = data.WorkSocialExp_candidate;
        
        var _mes;
        var miFecha
        $scope.exp_lab = [];
        for (var j = 0; j < data.WorkSocialExp_candidate.length; j++) {          
          for (var i = 0; i < meses.length; i++) {
            if (data.WorkSocialExp_candidate[j].work_from_month == meses[i]) {
              //console.log(meses[i]);
              _mes = i;
              //$scope.exp_lab.push();
              miFecha = new Date(data.WorkSocialExp_candidate[j].work_from_year, i);
              $scope.exp_lab.push({
                actual_job: data.WorkSocialExp_candidate[j].actual_job,
                city: data.WorkSocialExp_candidate[j].city,
                country: data.WorkSocialExp_candidate[j].country,
                description: data.WorkSocialExp_candidate[j].description,
                id: data.WorkSocialExp_candidate[j].id,
                name: data.WorkSocialExp_candidate[j].name,
                positive_impact: data.WorkSocialExp_candidate[j].positive_impact,
                title: data.WorkSocialExp_candidate[j].title,
                work_from_month: data.WorkSocialExp_candidate[j].work_from_month,
                work_from_year: data.WorkSocialExp_candidate[j].work_from_year,
                work_to_month: data.WorkSocialExp_candidate[j].work_to_month,
                work_to_year: data.WorkSocialExp_candidate[j].work_to_year,
                fecha_orden: miFecha.toISOString()
              });              
              break;
            }
          }
        }
        console.log($scope.exp_lab);
        //console.log(data.WorkSocialExp_candidate[0].work_from_month);
        //console.log(data.WorkSocialExp_candidate[0].work_from_year);
        //console.log(data.Education_candidate);
        

        //$scope.user.push({
        //  Education_candidate: data.Education_candidate,
        //  Languages_candidate: data.Languages_candidate,
        //  VolunteerExp_candidate: data.VolunteerExp_candidate,
        //  WorkSocialExp_candidate: data.WorkSocialExp_candidate,
        //  abilities: data.abilities,
        //  avaliability: data.avaliability,
        //  avatar: data.avatar,
        //  birthday: data.birthday,
        //  cellphone_number: data.cellphone_number,
        //  city: data.city,
        //  competence_1: data.competence_1,
        //  competence_2: data.competence_2,
        //  competence_3: data.competence_3,
        //  country: data.country,
        //  custom_url: data.custom_url,
        //  email: data.email,
        //  exp_areas: data.exp_areas,
        //  exp_sectors: data.exp_sectors,
        //  extras: data.extras,
        //  first_name: data.first_name,
        //  genre: data.genre,
        //  hobbies: data.hobbies,
        //  interests: data.interests,
        //  last_name: data.last_name,
        //  prof_ID: data.prof_ID,
        //  professions: data.professions,
        //  salary_max: data.salary_max,
        //  salary_min: data.salary_min,  
        //  skill_1: data.skill_1,
        //  skill_2: data.skill_2, 
        //  skill_3: data.skill_3,
        //  social_facebook: data.social_facebook,
        //  social_linkedin: data.social_linkedin,
        //  social_snapchat: data.social_snapchat,
        //  social_snapchat_avatar: data.social_snapchat_avatar,
        //  social_twitter: data.social_twitter,
        //  social_youtube: data.social_youtube,
        //  visted_countries: data.visted_countries
        //});
        
        if ($scope.user.custom_url == "" || $scope.user.custom_url == null || $scope.user.custom_url == undefined) { $scope.ph = false; } else { $scope.ph = true; }


        //$scope.user.avatar = $window.localStorage.avatar;
        //console.log(data);

        if (data.salary_min == 0 || data.salary_min == "" | data.salary_min == null) {
          data.salary_min = 0;
        }

        if (data.salary_max == 0 || data.salary_max == "" | data.salary_max == null) {
          data.salary_max = 5000;
        }

        $scope.slider = {
          min: data.salary_min,
          max: data.salary_max,
          options: {
            floor: 0,
            ceil: 50000,
            step: 1000,
            precision: 20
          }
        };

        //Profesiones 
        for (var j = 0; j < $scope.user.professions.length; j++) {
          $scope.tempProfesiones.push($scope.user.professions[j].id);
        }

        //Intereses
        for (var j = 0; j < $scope.user.interests.length; j++) {
          $scope.tempIntereses.push($scope.user.interests[j].id);
        }
        contenidoFactory.ServiceContenido('catalogs/interests/?format=json', 'GET', '{}').then(function (data) {
          $scope.intereses = data.data;
          $scope.tempDatainteres = [];

          for (var j = 0; j < $scope.user.interests.length; j++) {
            //$scope.tempIntereses.push($scope.user.interests[j].id);
            for (var i = 0; i < $scope.intereses.length; i++) {

              if ($scope.intereses[i].id == $scope.user.interests[j].id) {
                $scope.tempDatainteres.push($scope.intereses[i]);

                $scope.intereses.splice(i, 1);
              }

            }
          }
        });

        //sector
        for (var j = 0; j < $scope.user.exp_sectors.length; j++) {
          $scope.tempSectores.push($scope.user.exp_sectors[j].id);
        }
        contenidoFactory.ServiceContenido('catalogs/exp-sectors/?format=json', 'GET', '{}').then(function (data) {
          $scope.sector = data.data;
          $scope.tempDataSector = [];

          for (var j = 0; j < $scope.user.exp_sectors.length; j++) {
            for (var i = 0; i < $scope.sector.length; i++) {

              if ($scope.sector[i].id == $scope.user.exp_sectors[j].id) {
                $scope.tempDataSector.push($scope.sector[i]);

                $scope.sector.splice(i, 1);
              }

            }
          }
        });

        for (var j = 0; j < $scope.user.exp_areas.length; j++) {
          $scope.tempAreas.push($scope.user.exp_areas[j].id);
        }
        contenidoFactory.ServiceContenido('catalogs/exp-areas/?format=json', 'GET', '{}').then(function (data) {
          $scope.area = data.data;
          $scope.tempDataArea = [];

          for (var j = 0; j < $scope.user.exp_areas.length; j++) {

            for (var i = 0; i < $scope.area.length; i++) {

              if ($scope.area[i].id == $scope.user.exp_areas[j].id) {
                $scope.tempDataArea.push($scope.area[i]);

                $scope.area.splice(i, 1);
              }

            }
          }

        });
      });      
    }

    //causas
    contenidoFactory.ServiceContenido('catalogs/causes/?format=json', 'GET', '{}').then(function (data) {
      $scope.causas = data.data;

    });

    //disiplinas
    contenidoFactory.ServiceContenido('catalogs/careers/?format=json', 'GET', '{}').then(function (data) {
      $scope.disiplinas = data.data;

    });

    //idioma
    contenidoFactory.ServiceContenido('catalogs/languages/?format=json', 'GET', '{}').then(function (data) {
      $scope.idioma = data.data;

    });

    //profesiones
    $scope.buscarprofesiones = function () {

      if ($scope.buscarprofesion == "") {
        $scope.profesiones = "";
      }
      else {
        contenidoFactory.ServiceContenido('catalogs/professions/?format=json', 'GET', '{}').then(function (data) {
          ////data.data);
          $scope.profesiones = data.data;
          $scope.tempData = [];

          for (var j = 0; j < $scope.user.professions.length; j++) {
            //$scope.tempProfesiones.push($scope.user.professions[j].id);
            for (var i = 0; i < $scope.profesiones.length; i++) {
              //$scope.tempData.push($scope.profesiones[i]);
              //$scope.profesiones.splice(i, i + 1);
              if ($scope.profesiones[i].id == $scope.user.professions[j].id) {
                ////);
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
        $scope.user.professions.push({
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
        $scope.user.professions.splice(index, 1);
        document.getElementById('cb-' + obj.name).checked = true;
        document.getElementById('btn-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
      }

    }

    //$scope.buscarintereses = function () {

    //    if ($scope.buscarinteres == "") {
    //        $scope.intereses = "";
    //    }
    //    else {
    //        contenidoFactory.ServiceContenido('catalogs/interests/?format=json', 'GET', '{}').then(function (data) {
    //            $scope.intereses = data.data;
    //            $scope.tempDatainteres = [];

    //            for (var j = 0; j < $scope.user.interests.length; j++) {
    //                //$scope.tempIntereses.push($scope.user.interests[j].id);
    //                for (var i = 0; i < $scope.intereses.length; i++) {

    //                    if ($scope.intereses[i].id == $scope.user.interests[j].id) {
    //                        $scope.tempDatainteres.push($scope.intereses[i]);

    //                        $scope.intereses.splice(i, 1);
    //                    }

    //                }
    //            }

    //        });
    //    }
    //}

    $scope.changeinteres = function (obj) {

      if (document.getElementById('int-' + obj.name).checked == true) {
        $scope.tempIntereses.push(obj.id);

        $scope.user.interests.push({
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
        $scope.user.interests.splice(index, 1);
        document.getElementById('int-' + obj.name).checked = true;
        document.getElementById('btnint-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
      }
      ////$scope.tempIntereses);
    }

    //$scope.buscarsectorexp = function () {
    //    if ($scope.buscarsectores == "") {
    //        $scope.sector = "";
    //    }
    //    else {
    //        contenidoFactory.ServiceContenido('catalogs/exp-sectors/?format=json', 'GET', '{}').then(function (data) {
    //            $scope.sector = data.data;
    //            $scope.tempDataSector = [];

    //            for (var j = 0; j < $scope.user.exp_sectors.length; j++) {
    //                for (var i = 0; i < $scope.sector.length; i++) {

    //                    if ($scope.sector[i].id == $scope.user.exp_sectors[j].id) {
    //                        $scope.tempDataSector.push($scope.sector[i]);

    //                        $scope.sector.splice(i, 1);
    //                    }

    //                }
    //            }
    //        });
    //    }
    //}


    $scope.changesector = function (obj) {

      if (document.getElementById('sec-' + obj.name).checked == true) {
        $scope.tempSectores.push(obj.id);
        $scope.user.exp_sectors.push({
          id: obj.id,
          name: obj.name
        });

        for (var j = 0; j < $scope.sector.length; j++) {

          if ($scope.sector[j].id == obj.id) {
            $scope.sector.splice(j, 1);
          }
        }

        document.getElementById('btnsec-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp";
        document.getElementById('sec-' + obj.name).checked = false;
      }
      else {

        var index = $scope.tempSectores.indexOf(obj.id);
        $scope.tempSectores.splice(index, 1);
        $scope.user.exp_sectors.splice(index, 1);

        document.getElementById('sec-' + obj.name).checked = true;
        document.getElementById('btnsec-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
      }
    }

    //area
    //$scope.buscarareaexp = function () {
    //    if ($scope.buscarareas == "") {
    //        $scope.area = "";
    //    }
    //    else {
    //        contenidoFactory.ServiceContenido('catalogs/exp-areas/?format=json', 'GET', '{}').then(function (data) {
    //            $scope.area = data.data;
    //            $scope.tempDataArea = [];

    //            for (var j = 0; j < $scope.user.exp_areas.length; j++) {

    //                for (var i = 0; i < $scope.area.length; i++) {

    //                    if ($scope.area[i].id == $scope.user.exp_areas[j].id) {
    //                        $scope.tempDataArea.push($scope.area[i]);

    //                        $scope.area.splice(i, 1);
    //                    }

    //                }
    //            }

    //        });
    //    }          
    //}

    $scope.changearea = function (obj) {
      ////obj.name);
      if (document.getElementById('ar-' + obj.name).checked == true) {
        $scope.tempAreas.push(obj.id);
        $scope.user.exp_areas.push({
          id: obj.id,
          name: obj.name
        });

        for (var j = 0; j < $scope.area.length; j++) {

          if ($scope.area[j].id == obj.id) {
            $scope.area.splice(j, 1);
          }
        }

        document.getElementById('btnar-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp";
        document.getElementById('ar-' + obj.name).checked = false;
      }
      else {
        var index = $scope.tempAreas.indexOf(obj.id);
        $scope.tempAreas.splice(index, 1);
        $scope.user.exp_areas.splice(index, 1);

        document.getElementById('ar-' + obj.name).checked = true;
        document.getElementById('btnar-' + obj.name).className = "col-xs-12 dp-btn-boton-interes-exp-sin";
      }
    }

    //Guardar General
    $scope.guardarGeneral = function (ev) {
      //$templateCache.removeAll();

      if ($scope.userAvatar != undefined) {
        $scope.user.avatar = "";
        //$window.localStorage.avatar = "";
        contenidoFactory.ServicePerfil('candidates/me/avatar/', 'PUT', {
          "image": $scope.myCroppedImage.split(',')[1],
          "extension": $scope.tipoimg

        }).then(function (data) {
          //console.log(data);
          contenidoFactory.ServicePerfil('candidates/' + $window.localStorage.id_candidate + '/', 'GET', '{}').then(function (data) {
            ///console.log(data.avatar);
            //$window.localStorage.avatar = data.avatar;
            $scope.user.avatar = data.avatar;
          });
        });
      }

      contenidoFactory.ServicePerfil('users/' + $window.localStorage.id_user + '/edit/', 'PUT', {
        "first_name": $scope.user.first_name,
        "last_name": $scope.user.last_name

      }).then(function (data) {
        ////data);

      });

      contenidoFactory.ServicePerfil('candidates/' + $window.localStorage.id_candidate + '/edit/profile/', 'PUT', {
        answer_2: $scope.user.answer_2,
        competence_1: $scope.user.competence_1,
        competence_2: $scope.user.competence_2,
        competence_3: $scope.user.competence_3,
        skill_1: $scope.user.skill_1,
        skill_2: $scope.user.skill_2,
        skill_3: $scope.user.skill_3,
        prof_ID: $scope.user.prof_ID,
        birthday: $scope.user.birthday,
        genre: $scope.user.genre,
        country: $scope.user.pais,
        city: $scope.user.city,
        social_facebook: $scope.user.social_facebook,
        social_twitter: $scope.user.social_twitter,
        social_linkedin: $scope.user.social_linkedin,
        social_snapchat: $scope.user.social_snapchat,
        social_youtube: $scope.user.social_youtube,
        cellphone_number: $scope.user.cellphone_number,
        professions: $scope.tempProfesiones,
        interests: $scope.tempIntereses,
        exp_sectors: $scope.tempSectores,
        exp_areas: $scope.tempAreas,
        salary_min: $scope.slider.min,
        salary_max: $scope.slider.max,
        avaliability: $scope.user.avaliability,
        hobbies: $scope.user.hobbies,
        visted_countries: $scope.user.visted_countries,
        abilities: $scope.user.abilities,
        extras: $scope.user.extras,
        custom_url: $scope.user.custom_url
      }).then(function (data) {
        //data);
        var confirm = $mdDialog.confirm(
          {
            targetEvent: ev,
            template: '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
              '<md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
              '<div class="md-dialog-content-body"><h4 class="negrita">Tus datos se han actualizado correctamente</h4></div>' +
              '</md-dialog-content>' +
              '<md-dialog-actions>' +
              '<md-button ng-click="dialog.hide()" class="md-primary md-confirm-button">Aceptar</md-button>' +
              '</md-dialog-actions>' +
              '</md-dialog>'
          });
        //.title('Borrar Experiencia Laboral?')
        //.textContent('Estas seguro que deseas borrar este item.')
        //.ariaLabel('')
        //.targetEvent(ev)
        //.cancel('No')
        //.ok('Si');                
        ////confirm);
        $mdDialog.show(confirm).then(function () {
          location.reload();
        });

      });
    }

    $scope.existeurl = function (ev) {
      ////);
      var _url = $scope.user.custom_url.toString().toLowerCase();
      ////_url);
      contenidoFactory.ServicePerfil('candidates/custom-url/exists/', 'POST', {
        "custom_url": _url,

      }).then(function (data) {
        if (data.exists == true) {
          contenidoFactory.mensaje(ev, "La url que escribiste ya esta en uso");
          //$mdToast.show($mdToast.simple().content("La url que escribiste ya esta en uso").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
        }
      });
    }

    //console.log($window.localStorage.validacion);
    if ($window.localStorage.validacion == "true") {
      $scope.experties = {};
      $scope.education = {};
      var numero = false;
      var trabajo = false;
      var educacion = false;
      contenidoFactory.ServicePerfil('candidates/me/', 'GET', '{}').then(function (data) {
        console.log(data);
        if ($scope.user.cellphone_number == "" || $scope.user.cellphone_number == null) {
          focus('user.cellphone_number');
          numero = true;
        }

        if (data.WorkSocialExp_candidate.length == 0) {
          focus('experties.name');
          $scope.agregarExpericia = true;
          $scope.btnAgregar = true;
          $scope.btnEditar = false;
          trabajo = true;
        }
        if (data.Education_candidate.length == 0) {
          focus('education.institution');
          $scope.agregarEducacion = true;
          $scope.btnAgregar = true;
          $scope.btnEditar = false;
          educacion = true;
        }
        //console.log(numero + ' ' + trabajo + ' ' + educacion);
        if (numero == true && trabajo == true && educacion == true) {
          focus('user.first_name');
        }

        if (numero == false && trabajo == true && educacion == true) {
          focus('experties.title');
        }

        if (numero == false && trabajo == true && educacion == false) {
          focus('experties.title');
        }

        if (numero == false && trabajo == false && educacion == true) {
          focus('education.discipline');
        }
      });

    }
  }]);
