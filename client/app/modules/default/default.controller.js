let name = 5;

class DefaultController {

  constructor($scope, $state, cnabOnlineClient) {
    this.cnabOnlineClient = cnabOnlineClient;
    this.$scope = $scope;
    this.$state = $state;
    this.progressActive = false;
    this.progressPercentage = 50;
    this.errors = [];
  }

  /** Upload selected file */
  uploadFile(file) {
    if(file) {
      let promise = this.cnabOnlineClient.uploadFile(file);

      this.progressActive = true;
      this.progressPercentage = 0;

      promise.then( (response) => {
        this.progressActive = false;
        this.$state.go('file.file-viewer', {
          'fileId': response.data.id
        });
      }, (response) => {
        this.progressActive = false;
        this.errors = response.errors;
      }, (response) => {
        this.progressPercentage = response.percentage;
      });
    } else {
      console.log('no file selected', file);
    }
  }
}

export default DefaultController;