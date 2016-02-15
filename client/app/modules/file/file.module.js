import FileController from 'app/modules/file/file.controller.js';

let module = angular.module('file', ['ui.router']);

module.controller(
  'FileController',
  FileController
);

module.config(($stateProvider)=>{

  $stateProvider
    .state('file', {
      url: '/file/:fileId',
      templateUrl: 'app/modules/file/file.view.html',
      controller: 'FileController',
      resolve: {
        fileResponse: function(cnabOnlineClient, $stateParams){
          return cnabOnlineClient.getFile($stateParams['fileId']);
        }
      }
    });

});