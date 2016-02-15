import DefaultController from 'app/modules/default/default.controller.js';

let module = angular.module('default', ['ui.router']);

module.controller(
  'DefaultController',
  DefaultController
);

module.config(($stateProvider)=>{

  $stateProvider
    .state('default', {
      url: '/',
      templateUrl: 'app/modules/default/default.view.html'
    });

});