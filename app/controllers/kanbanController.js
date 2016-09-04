(function() {

  //Controller used with kanban.html view
  var kanbanController = function($rootScope, $scope, $mdSidenav, $log, $mdDialog, $mdToast,
    $location, $window, $interval, $translate, $route, kanbanFactory, dragulaService) {

    //Boards array
    $scope.boards = [];
    //Cards arrays for every category
    $scope.readyCards = [];
    $scope.inprogressCards = [];
    $scope.pausedCards = [];
    $scope.testingCards = [];
    $scope.doneCards = [];

    //FAB speed dial options
    this.isOpen = false;
    this.selectedMode = 'md-fling';
    this.selectedDirection = 'up';

    //Username and email
    this.username = $window.sessionStorage.getItem('username');
    this.email = $window.sessionStorage.getItem('email');

    //Translate functions
    $scope.translateToEnglish = function() {
      $translate.use('en');
      $route.reload();
    };
    $scope.translateToSpanish = function() {
      $translate.use('es');
      $route.reload();
    };

    //Translations
    $translate(['logout', 'create', 'create_card', 'create_board', 'edit_name', 'edit_description',
    'delete_board', 'edit_card', 'delete_card', 'first_kanban_name', 'first_kanban_description',
    'error_dialog_title', 'error_dialog_content', 'logout_dialog_title', 'logout_dialog_title',
    'logout_dialog_content', 'createcard_dialog_title', 'createcard_dialog_content',
    'createcard_error', 'editcard_dialog_title', 'editcard_error', 'deletecard_dialog_title',
    'deletecard_dialog_content', 'deletecard_error', 'createboard_dialog_name',
    'createboard_dialog_description', 'createboard_error', 'editboard_dialog_name',
    'editboard_dialog_description', 'editboard_error', 'deleteboard_dialog_title',
    'deleteboard_dialog_content', 'deleteboard_error', 'dialog_ok', 'dialog_cancel', 'dialog_save',
    'dialog_next', 'dialog_title', 'dialog_description'])
    .then(function (translations) {
      $scope.logout = translations.logout;
      $scope.create = translations.create;
      $scope.create_card = translations.create_card;
      $scope.create_board = translations.create_board;
      $scope.edit_name = translations.edit_name;
      $scope.edit_description = translations.edit_description;
      $scope.delete_board = translations.delete_board;
      $scope.edit_card = translations.edit_card;
      $scope.delete_card = translations.delete_card;
      $scope.first_kanban_name = translations.first_kanban_name;
      $scope.first_kanban_description = translations.first_kanban_description;
      $scope.error_dialog_title = translations.error_dialog_title;
      $scope.error_dialog_content = translations.error_dialog_content;
      $scope.logout_dialog_title = translations.logout_dialog_title;
      $scope.logout_dialog_content = translations.logout_dialog_content;
      $scope.createcard_dialog_title = translations.createcard_dialog_title;
      $scope.createcard_dialog_content = translations.createcard_dialog_content;
      $scope.createcard_error = translations.createcard_error;
      $scope.editcard_dialog_title = translations.editcard_dialog_title;
      $scope.editcard_error = translations.editcard_error;
      $scope.deletecard_dialog_title = translations.deletecard_dialog_title;
      $scope.deletecard_dialog_content = translations.deletecard_dialog_content;
      $scope.deletecard_error = translations.deletecard_error;
      $scope.createboard_dialog_name = translations.createboard_dialog_name;
      $scope.createboard_dialog_description = translations.createboard_dialog_description;
      $scope.createboard_error = translations.createboard_error;
      $scope.editboard_dialog_name = translations.editboard_dialog_name;
      $scope.editboard_dialog_description = translations.editboard_dialog_description;
      $scope.editboard_error = translations.editboard_error;
      $scope.deleteboard_dialog_title = translations.deleteboard_dialog_title;
      $scope.deleteboard_dialog_content = translations.deleteboard_dialog_content;
      $scope.deleteboard_error = translations.deleteboard_error;
      $scope.dialog_ok = translations.dialog_ok;
      $scope.dialog_cancel = translations.dialog_cancel;
      $scope.dialog_save = translations.dialog_save;
      $scope.dialog_next = translations.dialog_next;
      $scope.dialog_title = translations.dialog_title;
      $scope.dialog_description = translations.dialog_description;
    }, function (translationIds) {
      $scope.logout = translationIds.logout;
      $scope.create = translationIds.create;
      $scope.create_card = translationIds.create_card;
      $scope.create_board = translationIds.create_board;
      $scope.edit_name = translationIds.edit_name;
      $scope.edit_description = translationIds.edit_description;
      $scope.delete_board = translationIds.delete_board;
      $scope.edit_card = translationIds.edit_card;
      $scope.delete_card = translationIds.delete_card;
      $scope.first_kanban_name = translationIds.first_kanban_name;
      $scope.first_kanban_description = translationIds.first_kanban_description;
      $scope.error_dialog_title = translationIds.error_dialog_title;
      $scope.error_dialog_content = translationIds.error_dialog_content;
      $scope.logout_dialog_title = translationIds.logout_dialog_title;
      $scope.logout_dialog_content = translationIds.logout_dialog_content;
      $scope.createcard_dialog_title = translationIds.createcard_dialog_title;
      $scope.createcard_dialog_content = translationIds.createcard_dialog_content;
      $scope.createcard_error = translationIds.createcard_error;
      $scope.editcard_dialog_title = translationIds.editcard_dialog_title;
      $scope.editcard_error = translationIds.editcard_error;
      $scope.deletecard_dialog_title = translationIds.deletecard_dialog_title;
      $scope.deletecard_dialog_content = translationIds.deletecard_dialog_content;
      $scope.deletecard_error = translationIds.deletecard_error;
      $scope.createboard_dialog_name = translationIds.createboard_dialog_name;
      $scope.createboard_dialog_description = translationIds.createboard_dialog_description;
      $scope.createboard_error = translationIds.createboard_error;
      $scope.editboard_dialog_name = translationIds.editboard_dialog_name;
      $scope.editboard_dialog_description = translationIds.editboard_dialog_description;
      $scope.editboard_error = translationIds.editboard_error;
      $scope.deleteboard_dialog_title = translationIds.deleteboard_dialog_title;
      $scope.deleteboard_dialog_content = translationIds.deleteboard_dialog_content;
      $scope.deleteboard_error = translationIds.deleteboard_error;
      $scope.dialog_ok = translationIds.dialog_ok;
      $scope.dialog_cancel = translationIds.dialog_cancel;
      $scope.dialog_save = translationIds.dialog_save;
      $scope.dialog_next = translationIds.dialog_next;
      $scope.dialog_title = translationIds.dialog_title;
      $scope.dialog_description = translationIds.dialog_description;
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

    //Get all boards for the user
    $scope.getBoardsAndCards = function() {
      kanbanFactory.getBoards($window.sessionStorage.getItem('userID'),
      $window.sessionStorage.getItem('token'))
      .success(function(response) {
        if(response.success) {
          //Action after getting the boards
          angular.forEach(response.message, function(board){
            $scope.boards.push(board);
          });
          if($scope.boards.length !== 0) { //if the user owns any board
            $scope.getCards($scope.boards[0]);
            $scope.actualBoard = $scope.boards[0];
            $scope.toolbarTitle = $scope.boards[0].name;
          } else { //if not, creates one
            var jsonBoard = {
              name: $scope.first_kanban_name,
              description: $scope.first_kanban_description,
              owner: $window.sessionStorage.getItem('userID')
            };
            $scope.addBoard(jsonBoard);
            $scope.toolbarTitle = jsonBoard.name;
          }
        }
      })
      .error(function(response, status) {
        $scope.showAlert();
      });
    };

    //Check the new card category to save
    // params: card
    $scope.checkCategory = function(card) {
      switch (card.category) {
        case 'ready':
          $scope.readyCards.push(card);
          break;
        case 'inprogress':
          $scope.inprogressCards.push(card);
          break;
        case 'paused':
          $scope.pausedCards.push(card);
          break;
        case 'testing':
          $scope.testingCards.push(card);
          break;
        case 'done':
          $scope.doneCards.push(card);
          break;
      }
    };

    //Get the cards for a boards and show them using the factory
    // params: board
    $scope.getCards = function(board) {
      kanbanFactory.getCards(board._id, $window.sessionStorage.getItem('token'))
        .success(function(response) {
          //For every card, check the category to draw the board successfully
          angular.forEach(response.message, function(card){
            $scope.checkCategory(card);
          });
        })
        .error(function(response, status) {
          $scope.showAlert();
        });
    };

    //Create new card
    // params: card
    $scope.addCard = function(card) {
      kanbanFactory.createCard($scope.actualBoard._id, card, $window.sessionStorage.getItem('token'))
        .success(function(response) {
          //Action after creating the card
          $scope.checkCategory(response.message);
        })
        .error(function(response, status) {
          $scope.showAlert();
        });
    };

    //Edit card
    // params: card
    $scope.editCard = function(card) {
      kanbanFactory.editCard($scope.actualBoard._id, card, $window.sessionStorage.getItem('token'))
        .success(function(response) {
          //Action after editing card
        })
        .error(function(response, status) {
          $scope.showAlert();
        });;
    };

    //Delete card
    // params: index (card position), card
    $scope.deleteCard = function(index, card) {
      kanbanFactory.deleteCard($scope.actualBoard._id, card, $window.sessionStorage.getItem('token'))
        .success(function(response) {
          if(card.category == 'ready')
            $scope.readyCards.splice(index, 1);
          else if(card.category == 'inprogress')
            $scope.inprogressCards.splice(index, 1);
          else if(card.category == 'paused')
            $scope.pausedCards.splice(index, 1);
          else if(card.category == 'testing')
            $scope.testingCards.splice(index, 1);
          else if(card.category == 'done')
            $scope.doneCards.splice(index, 1);
        })
        .error(function(response, status) {
          $scope.showAlert();
        });;
    };

    //Clear cards arrays
    $scope.clearBoard = function() {
      $scope.readyCards = [];
      $scope.inprogressCards = [];
      $scope.pausedCards = [];
      $scope.testingCards = [];
      $scope.doneCards = [];
    };

    //Displays all cards for the selected board
    // params: board
    $scope.switchBoard = function(board) {
      $scope.clearBoard();
      $scope.toolbarTitle = board.name; //set toolbar title
      $scope.actualBoard = board;
      $scope.getCards(board);
      $scope.toggleLeft();
    };

    //Creates new board
    // params: board
    $scope.addBoard = function(board) {
      kanbanFactory.createBoard(board, $window.sessionStorage.getItem('token'))
        .success(function(response) {
          $scope.boards.push(response.message);
        })
        .error(function(response, status) {
          $scope.showAlert();
        });;
    };

    //Edit board
    // params: board
    $scope.editBoard = function(board) {
      kanbanFactory.editBoard(board, $window.sessionStorage.getItem('token'))
        .success(function(response) {
          //Action after editing board
        })
        .error(function(response, status) {
          $scope.showAlert();
        });;
    };

    //Delete board
    // params: index (board position), board
    $scope.deleteBoard = function(index, board) {
      kanbanFactory.deleteBoard(board._id, $window.sessionStorage.getItem('token'))
        .success(function(response) {
            if($scope.boards.length !== 0) {
              $scope.boards.splice(index, 1);
              $scope.clearBoard();
              $scope.getCards($scope.boards[0]);
              $scope.actualBoard = $scope.boards[0];
              $scope.toolbarTitle = $scope.boards[0].name;
              $scope.toggleLeft();
          }
        })
        .error(function(response, status) {
          $scope.showAlert();
        });;
    };

    //Drag card event
    $scope.$on('first-bag.drag', function (e, el, container, source) {
      $scope.dragging = true;
    });

    //Drop card event
    //Handles moving cards to different containers, editing and saving them
    $scope.$on('first-bag.drop', function (e, el, container, source) {
      console.log("Card dropped!");
      $scope.dragging = false;
      var card = el.scope().card;
      if(container.parent().hasClass('ready') == true) {
        card.category = 'ready';
      }
      else if(container.parent().hasClass('inprogress') == true) {
        card.category = 'inprogress';
      }
      else if(container.parent().hasClass('paused') == true) {
        card.category = 'paused';
      }
      else if(container.parent().hasClass('testing') == true) {
        card.category = 'testing';
      }
      else if(container.parent().hasClass('done') == true) {
        card.category = 'done';
      }
      $scope.editCard(card); //Edita la tarjeta y la guarda
    });

    //Left sidenav hide and show actions
    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle().then(function(){
      });
    };

    //Close the user session
    $scope.logoutDialog = function(ev) {
      var dialog = $mdDialog.confirm()
            .title($scope.logout_dialog_title)
            .textContent($scope.logout_dialog_content)
            .ariaLabel('Logout')
            .targetEvent(ev)
            .ok($scope.dialog_ok)
            .cancel($scope.dialog_cancel);
      $mdDialog.show(dialog).then(function() {
        kanbanFactory.logout()
          .success(function(response) {
            //remove the user token and user ID from the sessionStorage
            $window.sessionStorage.removeItem('token');
            $window.sessionStorage.removeItem('userID');
            //go to login page
            $location.path('/login');
          })
          .error(function(response, status) {
            $scope.showAlert();
          });;
      }, function() {
        //cancel
      });
    };

    //Show the dialog to create a new card
    $scope.addNewCardDialog = function(ev) {
      var dialog = $mdDialog.prompt()
            .title($scope.createcard_dialog_title)
            .textContent($scope.createcard_dialog_content)
            .placeholder($scope.dialog_description)
            .ariaLabel('Card description')
            .targetEvent(ev)
            .ok($scope.dialog_save)
            .cancel($scope.dialog_cancel);
      $mdDialog.show(dialog).then(function(result) {
        var card = { content: result, category: 'ready' };
        if(card.content != '' && card.content != undefined) {
          $scope.addCard(card); //Creates new card
        } else {
          $mdToast.show($mdToast.simple().textContent($scope.createcard_error));
        }
      }, function() {
        //Empty description - Doesn't create card
        $mdToast.show($mdToast.simple().textContent($scope.createcard_error));
      });
    };

    //Show the dialog to edit a card
    // params: index (card position), card
    $scope.editCardDialog = function(ev, index, card) {
      var dialog = $mdDialog.prompt()
            .title($scope.editcard_dialog_title)
            .placeholder('description')
            .initialValue(card.content)
            .ariaLabel('Card description')
            .targetEvent(ev)
            .ok($scope.dialog_save)
            .cancel($scope.dialog_cancel);
      $mdDialog.show(dialog).then(function(result) {
        if(result != '' && result != undefined) {
          card.content = result;
          $scope.editCard(card); //Edit card
        } else {
          $mdToast.show($mdToast.simple().textContent($scope.editcard_error));
        }
      }, function() {
        //Empty description - Doesn't create card
        $mdToast.show($mdToast.simple().textContent($scope.editcard_error));
      });
    };

    //Delete card in $scope array and in database
    // params: index (card position), card
    $scope.deleteCardDialog = function(index, card) {
      var dialog = $mdDialog.confirm()
            .title($scope.deletecard_dialog_title)
            .textContent($scope.deletecard_dialog_content)
            .ariaLabel('Delete card')
            .ok($scope.dialog_ok)
            .cancel($scope.dialog_cancel);
      $mdDialog.show(dialog).then(function() {
        $scope.deleteCard(index, card);
      }, function() {
        $mdToast.show($mdToast.simple().textContent($scope.deletecard_error));
      });
    };

    //Show the dialog to create a new board
    $scope.addNewBoardDialog = function(ev) {
      var board = { owner: $window.sessionStorage.getItem('userID') };
      var boardTitleDialog = $mdDialog.prompt()
            .title($scope.createboard_dialog_name)
            .placeholder($scope.dialog_title)
            .ariaLabel('Board title')
            .targetEvent(ev)
            .ok($scope.dialog_next)
            .cancel($scope.dialog_cancel);
      var boardDescriptionDialog = $mdDialog.prompt()
            .title($scope.createboard_dialog_description)
            .placeholder($scope.dialog_description)
            .ariaLabel('Board description')
            .targetEvent(ev)
            .ok($scope.dialog_save)
            .cancel($scope.dialog_cancel);
      //Show board title dialog
      $mdDialog.show(boardTitleDialog).then(function(resultTitle) {
        if(resultTitle != '' && resultTitle != undefined) {
          //Show board description dialog
          $mdDialog.show(boardDescriptionDialog).then(function(resultDescription) {
            if(resultDescription != '' && resultDescription != undefined) {
              //Save board
              board.name = resultTitle;
              board.description = resultDescription;
              $scope.addBoard(board);
            } else {
              $mdToast.show($mdToast.simple().textContent($scope.createboard_error));
            }
          }, function() {
            $mdToast.show($mdToast.simple().textContent($scope.createboard_error));
          });
        } else {
          $mdToast.show($mdToast.simple().textContent($scope.createboard_error));
        }
      }, function() {
        $mdToast.show($mdToast.simple().textContent($scope.createboard_error));
      });
    };

    //Edit board name dialog
    // params: index (board position), board
    $scope.editBoardNameDialog = function(ev, index, board) {
      var dialog = $mdDialog.prompt()
            .title($scope.editboard_dialog_name)
            .placeholder($scope.dialog_title)
            .initialValue(board.name)
            .ariaLabel('Board name')
            .targetEvent(ev)
            .ok($scope.dialog_save)
            .cancel($scope.dialog_cancel);
      $mdDialog.show(dialog).then(function(result) {
        if(result != '' && result != undefined) {
          board.name = result;
          $scope.editBoard(board); //Edit card
        } else {
          $mdToast.show($mdToast.simple().textContent($scope.editboard));
        }
      }, function() {
        //Empty description - Doesn't create card
        $mdToast.show($mdToast.simple().textContent($scope.editboard_error));
      });
    };

    //Edit board description dialog
    // params: index (board position), board
    $scope.editBoardDescriptionDialog = function(ev, index, board) {
      var dialog = $mdDialog.prompt()
            .title($scope.editboard_dialog_description)
            .placeholder($scope.dialog_description)
            .initialValue(board.description)
            .ariaLabel('Board description')
            .targetEvent(ev)
            .ok($scope.dialog_save)
            .cancel($scope.dialog_cancel);
      $mdDialog.show(dialog).then(function(result) {
        if(result != '' && result != undefined) {
          board.description = result;
          $scope.editBoard(board); //Edit card
        } else {
          $mdToast.show($mdToast.simple().textContent($scope.editboard_error));
        }
      }, function() {
        //Empty description - Doesn't create card
        $mdToast.show($mdToast.simple().textContent($scope.editboard_error));
      });
    };

    //Delete board dialog
    // params: index (board position), board
    $scope.deleteBoardDialog = function(index, board) {
      var dialog = $mdDialog.confirm()
            .title($scope.deleteboard_dialog_title)
            .textContent($scope.deleteboard_dialog_content)
            .ariaLabel('Delete board')
            .ok($scope.dialog_ok)
            .cancel($scope.dialog_cancel);
      $mdDialog.show(dialog).then(function() {
        $scope.deleteBoard(index, board);
        }, function() {
          $mdToast.show($mdToast.simple().textContent($scope.deleteboard_error));
        });
    };

    //Get all user boards (and cards) when enter or refresh the application
    $scope.getBoardsAndCards();
  };

  kanbanController.$inject = ['$rootScope', '$scope', '$mdSidenav', '$log', '$mdDialog', '$mdToast',
  '$location', '$window', '$interval', '$translate', '$route', 'kanbanFactory', 'dragulaService'];

  angular.module('kanban-board')
    .controller('kanbanController', kanbanController);

}());
