(function() {

  //Main AngularJS module. Used to route between views and store  the translations
  var app = angular.module('kanban-board', [angularDragula(angular), 'ngMaterial', 'ngAnimate',
  'ngMessages', 'ngRoute', 'pascalprecht.translate']);

  app.config(function($routeProvider, $translateProvider) {

    //routes
    $routeProvider
      .when('/login', {
        controller: 'loginController',
        templateUrl: 'views/login.html'
      })
      .when('/register', {
        controller: 'registerController',
        templateUrl: 'views/register.html'
      })
      .when('/kanban', {
        templateUrl: 'views/kanban.html'
      })
      .otherwise( { redirectTo: '/login' } );

      //English translations
      $translateProvider.translations('en', {
        'translate_english': 'Translate to English',
        'translate_spanish': 'Translate to Spanish',
        'login': 'Login',
        'register': 'Register',
        'signin': 'Sign In',
        'signup': 'Sign Up',
        'kanban_boards': 'Kanban boards',
        'todo': 'To do',
        'inprogress': 'In progress',
        'paused': 'Paused',
        'testing': 'Testing',
        'done': 'Done',
        'logout': 'Close session',
        'create': 'Create',
        'create_card': 'Create card',
        'create_board': 'Create board',
        'edit_name': 'Edit name',
        'edit_description': 'Edit description',
        'delete_board': 'Delete board',
        'edit_card': 'Edit card',
        'delete_card': 'Delete card',
        'first_kanban_name': 'My kanban board',
        'first_kanban_description': 'This is your first kanban board.',
        'error_dialog_title': 'Error',
        'error_dialog_content': 'There is a network error. Check your connection.',
        'logout_dialog_title': 'Logout',
        'logout_dialog_content': 'Are you sure you want to close the session?',
        'createcard_dialog_title': 'Create new card',
        'createcard_dialog_content': 'Enter the description',
        'createcard_error': 'Card was not created',
        'editcard_dialog_title': 'Edit card',
        'editcard_error': 'Card was not edited',
        'deletecard_dialog_title': 'Delete card',
        'deletecard_dialog_content': 'Are you sure you want to delete this card?',
        'deletecard_error': 'Card was not deleted',
        'createboard_dialog_name': 'Board name',
        'createboard_dialog_description': 'Board description',
        'createboard_error': 'Board was not created',
        'editboard_dialog_name': 'Edit board name',
        'editboard_dialog_description': 'Edit board description',
        'editboard_error': 'Board was not edited',
        'deleteboard_dialog_title': 'Delete board',
        'deleteboard_dialog_content': 'Are you sure you want to delete this board? All associated cards will be deleted',
        'deleteboard_error': 'Board was not deleted',
        'dialog_ok': 'ok',
        'dialog_cancel': 'cancel',
        'dialog_save': 'save',
        'dialog_next': 'next',
        'username_placeholder': 'username',
        'password_placeholder': 'password',
        'email_placeholder': 'email',
        'title_placeholder': 'title',
        'description_placeholder': 'description',
        'activation_message': 'We have sent you an email to activate your Taskban account',
        'login_error': 'Login error. The username or password are not valid',
        'register_error': 'Register error. This email or username already exists',
        'dialog_title': 'name',
        'dialog_description': 'description'
      });

      //Spanish translations
      $translateProvider.translations('es', {
        'translate_english': 'Traducir al inglés',
        'translate_spanish': 'Traducir al español',
        'signin': 'Iniciar sesión',
        'signup': 'Registrarse',
        'login': 'Inicio de sesión',
        'register': 'Registro',
        'kanban_boards': 'Tableros kanban',
        'todo': 'Por hacer',
        'inprogress': 'En proceso',
        'paused': 'Pausadas',
        'testing': 'Probando',
        'done': 'Hechas',
        'logout': 'Cerrar sesión',
        'create': 'Crear',
        'create_card': 'Crear tarjeta',
        'create_board': 'Crear tablero',
        'edit_name': 'Editar nombre',
        'edit_description': 'Editar descripción',
        'delete_board': 'Eliminar tablero',
        'edit_card': 'Editar tarjeta',
        'delete_card': 'Eliminar tarjeta',
        'first_kanban_name': 'Mi tablero kanban',
        'first_kanban_description': 'Este es tu primer tablero kanban.',
        'error_dialog_title': 'Error',
        'error_dialog_content': 'Hay un error de red. Comprueba tu conexión a internet.',
        'logout_dialog_title': 'Cerrar sesión',
        'logout_dialog_content': '¿Estás seguro de que quieres cerrar sesión?',
        'createcard_dialog_title': 'Crear nueva tarjeta',
        'createcard_dialog_content': 'Introduce la descripción',
        'createcard_error': 'La tarjeta no se ha creado',
        'editcard_dialog_title': 'Editar tarjeta',
        'editcard_error': 'La tarjeta no se ha editado',
        'deletecard_dialog_title': 'Eliminar tarjeta',
        'deletecard_dialog_content': '¿Estás seguro de que quieres eliminar esta tarjeta?',
        'deletecard_error': 'La tarjeta no ha sido eliminada',
        'createboard_dialog_name': 'Nombre del tablero',
        'createboard_dialog_description': 'Descripción del tablero',
        'createboard_error': 'El tablero no se ha creado',
        'editboard_dialog_name': 'Editar nombre',
        'editboard_dialog_description': 'Editar descripción',
        'editboard_error': 'El tablero no ha sido editado',
        'deleteboard_dialog_title': 'Eliminar tablero',
        'deleteboard_dialog_content': '¿Estás seguro de que quieres eliminar este tablero? Todas las tarjetas asociadas serán eliminadas.',
        'deleteboard_error': 'El tablero no ha sido eliminado',
        'dialog_ok': 'ok',
        'dialog_cancel': 'cancelar',
        'dialog_save': 'guardar',
        'dialog_next': 'siguiente',
        'username_placeholder': 'nombre de usuario',
        'password_placeholder': 'contraseña',
        'email_placeholder': 'email',
        'title_placeholder': 'título',
        'description_placeholder': 'descripción',
        'activation_message': 'Te hemos enviado un email para activar tu cuenta de Taskban',
        'login_error': 'Error en el inicio de sesión. El usuario o la contraseña no son válidos',
        'register_error': 'Error de registro. El email o el nombre de usuario ya existen',
        'dialog_title': 'nombre',
        'dialog_description': 'descripción'
      });

      $translateProvider.preferredLanguage('es');
    });

}());
