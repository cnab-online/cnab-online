import FileAdvancedController from 'app/modules/file-advanced/file-advanced.controller.js';

let module = angular.module('fileAdvanced', ['ui.router']);

module.controller(
  'FileAdvancedController',
  FileAdvancedController
);

module.config(($stateProvider)=>{

  $stateProvider
    .state('file.file-advanced', {
      url: '/file-advanced',
      templateUrl: 'app/modules/file-advanced/file-advanced.view.html',
      controller: 'FileAdvancedController',
      resolve: {
        linesResponse: function(cnabOnlineClient, $stateParams){
          return cnabOnlineClient.getLines($stateParams['fileId']);
        }
      }
    });

});