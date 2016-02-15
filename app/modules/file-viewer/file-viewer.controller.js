class FileViewerController {

  constructor($scope, occurrencesResponse) {
    $scope.occurrences = occurrencesResponse.data;
  }

}

export default FileViewerController;