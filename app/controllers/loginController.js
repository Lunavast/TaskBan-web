(function() {

  var loginController = function($rootScope, $scope, $location, $mdDialog, $mdToast, $window, $translate, userFactory) {

    $scope.username = this.username;
    $scope.password = this.password;

    //Translations

    var lang = $window.navigator.language || $window.navigator.userLanguage;
    if(lang == 'es' || lang == 'es-ES') {
      console.log('Se detecta idioma español');
      $translate.use(lang);
    } else {
      console.log('English language is detected');
      $translate.use('en');
    }

    $translate(['error_dialog_title', 'error_dialog_content', 'dialog_ok', 'login_error'])
    .then(function (translations) {
      $scope.error_dialog_title = translations.error_dialog_title;
      $scope.error_dialog_content = translations.error_dialog_content;
      $scope.dialog_ok = translations.dialog_ok;
      $scope.login_error = translations.login_error;
    }, function (translationIds) {
      $scope.error_dialog_title = translationIds.error_dialog_title;
      $scope.error_dialog_content = translationIds.error_dialog_content;
      $scope.dialog_ok = translationIds.dialog_ok;
      $scope.login_error = translationIds.login_error;
    });

    //Error dialog
    $scope.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(false)
        .title($scope.error_dialog_title)
        .textContent($scope.error_dialog_content)
        .ariaLabel('Error dialog')
        .ok($scope.dialog_ok)
      );
    };

    //Login function
    $scope.authenticate = function() {
      userFactory.authenticate($scope.username, $scope.password)
        .success(function(response) {
          if(response.success) { //authentication successful
            //Save the returned JSON web token into the sessionStorage
            $window.sessionStorage.token = response.token;
            //Save the returned user ID into the sessionStorage
            $window.sessionStorage.userID = response.user._id;
            //Save the username
            $window.sessionStorage.username = response.user.username;
            //Save the email
            $window.sessionStorage.email = response.user.email;
            //Go to kanban application
            $location.path('/kanban');
          } else { //authentication error
            $mdToast.show($mdToast.simple().textContent($scope.login_error));
          }
        })
        .error(function(response, status) {
          $scope.showAlert();
        });
    };

    //Switch to register page
    $scope.goRegister = function() {
      $location.path('/register');
    };

  };

  loginController.$inject = ['$rootScope', '$scope', '$location', '$mdDialog', '$mdToast', '$window', '$translate', 'userFactory'];

  angular.module('kanban-board')
    .controller('loginController', loginController);

}());
