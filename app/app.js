import angular from 'angular';
import 'angular-ui-router';

import DefaultController from 'app/default/default.controller.js';
import FileViewerController from 'app/file-viewer/file-viewer.controller.js';

let app = angular.module('app', [
  'ui.router',
]);

app.controller('DefaultController', DefaultController);
app.controller('FileViewerController', FileViewerController);

app.config(($stateProvider, $urlRouterProvider)=>{
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('default', {
      url: '/',
      templateUrl: 'app/default/default.view.html'
    })
    .state('file-viewer', {
      url: '/',
      templateUrl: 'app/file-viewer/file-viewer.view.html'
    });
});


/*
 * As we are using ES6 with Angular 1.x we can't use ng-app directive
 * to bootstrap the application as modules are loaded asynchronously.
 * Instead, we need to bootstrap the application manually
 */
var container = document.getElementById('app-container');
var noAngularDOM;

angular.element(document).ready(() => {
  if(location.origin.match(/localhost/)) {
    System.trace = true;
  }
  angular.bootstrap(container, [app.name]), {
    strictDi: true
  }
});

export default app;