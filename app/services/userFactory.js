(function() {

  //API REST calls service for loginController and registerController
  var userFactory = function($http) {
    var factory = {};

    //Get all users
    // params: token
    factory.getUsers = function(token) {
      return $http.get('/users', { headers: {'x-access-token': token } });
    };

    //Get user by identifier
    // params: userID, token
    factory.getUserById = function(userID, token) {
      return $http.get('/users/' + userID, { headers: {'x-access-token': token } });
    };

    //Login with existing user
    // params: username, password
    factory.authenticate = function(username, password) {
      var jsonObject = { username: username, password: password };
      return $http.post('/users/authenticate', jsonObject, { headers: {'x-platform': 'web' } });
    };

    //Register a new account
    // params: username, email, password
    factory.register = function(username, email, password) {
      var jsonObject = { username: username, password: password, email: email };
      return $http.post('/users/register', jsonObject);
    };

    return factory;
  };

  userFactory.$inject = ['$http'];

  angular.module('kanban-board').factory('userFactory', userFactory);

}());
