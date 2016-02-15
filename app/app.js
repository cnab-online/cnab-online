import angular from 'angular';
import 'angular-ui-router';
import 'app/modules/cnab-online-api/cnab-online-api.module.js';
import 'app/modules/default/default.module.js';
import 'app/modules/file/file.module.js';
import 'app/modules/file-viewer/file-viewer.module.js';
import 'app/modules/item-viewer/item-viewer.module.js';
import 'app/modules/file-advanced/file-advanced.module.js';

let app = angular.module('app', [
  'ui.router',
  'default',
  'file',
  'fileAdvanced',
  'fileViewer',
  'itemViewer',
  'cnabOnlineApi'
]);

app.config(($stateProvider, $urlRouterProvider)=>{
  $urlRouterProvider.otherwise('/'); 
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
  if(container) {
    angular.bootstrap(container, [app.name]), {
      strictDi: true
    }
  }
});

export default app;