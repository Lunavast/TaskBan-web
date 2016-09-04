(function() {

  //API REST calls service for kanbanController
  var kanbanFactory = function($http) {
    var factory = {};

    //Get boards by its owner
    // params: userID, token
    factory.getBoards = function(userID, token) {
      return $http.get('/boards/owner/' + userID, { headers: {'x-access-token': token } });
    };

    //Create a new board
    // params: board, token
    factory.createBoard = function(board, token) {
      return $http.post('/boards', board, { headers: {'x-access-token': token } });
    };

    //Get a board by its identifier
    // params: boardID, token
    factory.getBoardByID = function(boardID, token) {
      return $http.get('/boards/' + boardID, { headers: {'x-access-token': token } });
    };

    //Edit existing board
    // params: board, token
    factory.editBoard = function(board, token) {
      return $http.put('/boards/' + board._id, board, { headers: {'x-access-token': token } });
    };

    //Delete existing board
    // params: boardID, token
    factory.deleteBoard = function(boardID, token) {
      return $http.delete('/boards/' + boardID, { headers: {'x-access-token': token } });
    };

    //Get cards for a board
    // params: boardID, token
    factory.getCards = function(boardID, token) {
      return $http.get('/boards/' + boardID + '/cards', { headers: {'x-access-token': token } });
    };

    //Create card for a board
    // params: boardID, card, token
    factory.createCard = function(boardID, card, token) {
      return $http.post('/boards/' + boardID + '/cards', card, { headers: {'x-access-token': token } });
    };

    //Edit existing card
    // params: boardID, card, token
    factory.editCard = function(boardID, card, token) {
      return $http.put('/boards/' + boardID + '/cards/' + card._id, card, { headers: {'x-access-token': token } });
    };

    //Delete card
    // params: boardID, card, token
    factory.deleteCard = function(boardID, card, token) {
      return $http.delete('/boards/' + boardID + '/cards/' + card._id, { headers: {'x-access-token': token } });
    };

    //Close the user session
    factory.logout = function() {
      return $http.post('/users/logout');
    };

    return factory;
  };

  kanbanFactory.$inject = ['$http'];

  angular.module('kanban-board').factory('kanbanFactory', kanbanFactory);

}());
