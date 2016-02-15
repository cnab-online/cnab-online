import FileViewerController from 'app/modules/file-viewer/file-viewer.controller.js';

let module = angular.module('fileViewer', ['ui.router']);

module.controller(
  'FileViewerController',
  FileViewerController
);

module.config(($stateProvider)=>{

  $stateProvider
    .state('file.file-viewer', {
      url: '/file-viewer',
      templateUrl: 'app/modules/file-viewer/file-viewer.view.html',
      controller: 'FileViewerController',
      resolve: {
        occurrencesResponse: function(cnabOnlineClient, $stateParams){
          return cnabOnlineClient.getOccurrences($stateParams['fileId']);
        }
      }
    });

});