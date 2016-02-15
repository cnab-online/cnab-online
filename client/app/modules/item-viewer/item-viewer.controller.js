class ItemViewerController {

  constructor($scope, occurrenceResponse) {
    $scope.occurrenceAttributes = occurrenceResponse.attributes;
  }

}

export default ItemViewerController;