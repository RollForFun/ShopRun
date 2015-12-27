angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, Auth, $state, $window) {
  $scope.user = {};
  $scope.errors = {};

  $scope.login = function(form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function() {
        console.log("login success")
        // Logged in, redirect to home
        $state.go('tab.me');
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    }
  };

  $scope.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MeCtrl', function($scope, Auth) {
  $scope.getCurrentUser = Auth.getCurrentUser;
  $scope.settings = {
    enableFriends: true
  };
});
