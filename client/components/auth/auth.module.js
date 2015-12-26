'use strict';

angular.module('shoprunApp.auth', [
  'shoprunApp.constants',
  'shoprunApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
