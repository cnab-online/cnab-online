class FileController {

  constructor($scope, $stateParams, fileResponse) {
    $scope.fileAttributes = fileResponse.data.attributes;
    $scope.fileId = $stateParams['fileId'];
  }

}

export default FileController;