import ItemViewerController from 'app/modules/item-viewer/item-viewer.controller.js';

let module = angular.module('itemViewer', ['ui.router']);

module.controller(
  'ItemViewerController',
  ItemViewerController
);

module.config(($stateProvider)=>{

  $stateProvider
    .state('file.file-viewer.item-viewer', {
      url: '/:itemId',
      templateUrl: 'app/modules/item-viewer/item-viewer.view.html',
      controller: 'ItemViewerController',
      resolve: {
        occurrenceResponse: function(cnabOnlineClient, $stateParams, $q){
          return $q(function(resolve, reject) {
            cnabOnlineClient.getOccurrences($stateParams['fileId']).then(function(occurrenceResponse) {
              let occurrences = occurrenceResponse.data;
              let resolvedOccurrence = false;

              for(let occurrence of occurrences) {
                if(occurrence.id == $stateParams['itemId']) {
                  resolvedOccurrence = true;
                  resolve(occurrence);
                }
              }

              if(!resolvedOccurrence) {
                reject(null);
              }
            }, reject);
          });
        }
      }
    });

});