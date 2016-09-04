(function() {

  //Controller used with register.html
  var registerController = function($rootScope, $scope, $location, $mdDialog, $mdToast, $window, $translate, userFactory) {

    $scope.username = this.username;
    $scope.password = this.password;
    $scope.email = this.email;

    //Translations
    $translate(['error_dialog_title', 'error_dialog_content', 'dialog_ok', 'activation_message', 'register_error'])
    .then(function (translations) {
      $scope.error_dialog_title = translations.error_dialog_title;
      $scope.error_dialog_content = translations.error_dialog_content;
      $scope.dialog_ok = translations.dialog_ok;
      $scope.activation_message = translations.activation_message;
      $scope.register_error = translations.register_error;
    }, function (translationIds) {
      $scope.error_dialog_title = translationIds.error_dialog_title;
      $scope.error_dialog_content = translationIds.error_dialog_content;
      $scope.dialog_ok = translationIds.dialog_ok;
      $scope.activation_message = translationIds.activation_message;
      $scope.register_error = translationIds.register_error;
    });

    //Error dialog
    $scope.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(false)
        .title($scope.error_dialog_title)
        .textContent($scope.error_dialog_content)
        .ariaLabel('Error dialog')
        .ok($scope.ok)
      );
    };

    //Register function
    $scope.register = function() {
      userFactory.register($scope.username, $scope.email, $scope.password)
        .success(function(response) {
          if(response.success) { //User registered
            //Show a message to activate the user account
            $mdToast.show($mdToast.simple()
            .textContent($scope.activation_message)
            .action($scope.dialog_ok)
            .highlightAction(true)
            .highlightClass('md-accent'));
          } else { //register error
            $mdToast.show($mdToast.simple().textContent($scope.register_error));
          }
        })
        .error(function(response, status) {
          $scope.showAlert();
        });
    };

    //Switch to login page
    $scope.goLogin = function() {
      $location.path('/login');
    };

  };

  registerController.$inject = ['$rootScope', '$scope', '$location', '$mdDialog', '$mdToast', '$window', '$translate', 'userFactory'];

  angular.module('kanban-board')
    .controller('registerController', registerController);

}());
