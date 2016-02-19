import DefaultController from 'app/modules/default/default.controller.js';

let module = angular.module('default', ['ui.router']);

module.controller(
  'DefaultController',
  DefaultController
);

module.filter('defaultDate', function ($filter) {
    return function (input) {
        if (input == null) { return ""; }
        return $filter('date')(new Date(input), 'dd/MM/yyyy');
    };
});

module.filter('defaultCurrency', function ($filter) {
    return function (input) {
        if (input == null) { return ""; }
        if (input === '') { return ""; }
        if (isNaN(input)) { return input; }
        return 'R$ ' + Number(input).toFixed(2).replace('.', ',');
    };
});

module.config(($stateProvider)=>{

  $stateProvider
    .state('default', {
      url: '/',
      templateUrl: 'app/modules/default/default.view.html'
    });

});