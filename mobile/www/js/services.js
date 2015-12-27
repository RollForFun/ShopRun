var api_url = "http://localhost:9000";
angular.module('starter.services', [])

.factory('ApiUrl', function() {
  return {
    get: function() {
      return api_url;
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('User', function ($resource) {
  return $resource( api_url + '/api/users/:id/:controller', {
    id: '@_id'
  },
  {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    }
  });
})

.factory('Auth', function Auth($http, User, $cookies, $q) {
  /**
   * Return a callback or noop function
   *
   * @param  {Function|*} cb - a 'potential' function
   * @return {Function}
   */
  var safeCb = function(cb) {
    return (angular.isFunction(cb)) ? cb : angular.noop;
  },

  currentUser = {};

  if ($cookies.get('token')) {
    currentUser = User.get();
  }

  return {

    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    login: function(user, callback) {
      return $http.post(api_url + '/auth/local', {
        email: user.email,
        password: user.password
      })
      .then(function(res) {
        $cookies.put('token', res.data.token);
        currentUser = User.get();
        return currentUser.$promise;
      })
      .then(function(user) {
        safeCb(callback)(null, user);
        return user;
      })
      .catch(function(err) {
        console.log(err);
        this.logout();
        safeCb(callback)(err.data);
        return $q.reject(err.data);
      }.bind(this));
    },

    /**
     * Delete access token and user info
     */
    logout: function() {
      $cookies.remove('token');
      currentUser = {};
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    createUser: function(user, callback) {
      return User.save(user,
        function(data) {
          $cookies.put('token', data.token);
          currentUser = User.get();
          return safeCb(callback)(null, user);
        },
        function(err) {
          this.logout();
          return safeCb(callback)(err);
        }.bind(this)).$promise;
    },

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - optional, function(error, user)
     * @return {Promise}
     */
    changePassword: function(oldPassword, newPassword, callback) {
      return User.changePassword({ id: currentUser._id }, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function() {
        return safeCb(callback)(null);
      }, function(err) {
        return safeCb(callback)(err);
      }).$promise;
    },

    /**
     * Gets all available info on a user
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, funciton(user)
     * @return {Object|Promise}
     */
    getCurrentUser: function(callback) {
      if (arguments.length === 0) {
        return currentUser;
      }

      var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
      return $q.when(value)
        .then(function(user) {
          safeCb(callback)(user);
          return user;
        }, function() {
          safeCb(callback)({});
          return {};
        });
    },

    /**
     * Check if a user is logged in
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
    isLoggedIn: function(callback) {
      if (arguments.length === 0) {
        return currentUser.hasOwnProperty('role');
      }

      return this.getCurrentUser(null)
        .then(function(user) {
          var is = user.hasOwnProperty('role');
          safeCb(callback)(is);
          return is;
        });
    },

     /**
      * Check if a user is an admin
      *   (synchronous|asynchronous)
      *
      * @param  {Function|*} callback - optional, function(is)
      * @return {Bool|Promise}
      */
    isAdmin: function(callback) {
      if (arguments.length === 0) {
        return currentUser.role === 'admin';
      }

      return this.getCurrentUser(null)
        .then(function(user) {
          var is = user.role === 'admin';
          safeCb(callback)(is);
          return is;
        });
    },

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    getToken: function() {
      return $cookies.get('token');
    }
  };
});
