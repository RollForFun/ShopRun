'use strict';

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, Auth, $state) {
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

  $scope.register = function(form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.createUser({
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function() {
        // Account created, redirect to home
        $state.go('tab.me');
      })
      .catch(function(err) {
        var err = err.data;
        $scope.errors = {};

        // Update validity of form fields that match the sequelize errors
        if (err.name) {
          angular.forEach(err.fields, field => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = err.message;
          });
        }
      });
    }
  };
})

.controller('DashCtrl', function($scope, ApiUrl, $http) {
  $scope.feeds = [];
  $http.get(ApiUrl.get() + '/api/things')
  .then(function(res) {
    console.log(res);
    $scope.feeds = res.data;
  })
  .catch(function(err) {
    console.log(err);
  });
})

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

.controller('DiscoverCtrl', function($scope, ApiUrl, $http) {
  $scope.shops = [];
  $http.get(ApiUrl.get() + '/api/shops')
  .then(function(res) {
    console.log(res);
    $scope.shops = res.data;
  })
  .catch(function(err) {
    console.log(err);
  });
})

.controller('MeCtrl', function($scope, Auth) {
  $scope.getCurrentUser = Auth.getCurrentUser;
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ShopDetailCtrl', function($scope, $stateParams, ApiUrl, $http) {
  $scope.shop = {};
  $http.get(ApiUrl.get() + '/api/shops/' + $stateParams.shopId)
  .then(function(res) {
    console.log(res);
    $scope.shop = res.data;
  })
  .catch(function(err) {
    console.log(err);
  });
});
