class CnabOnlineClient {

  constructor($http, $q, Upload, CNAB_ONLINE_CONFIG) {
    this.$http = $http;
    this.$q = $q;
    this.Upload = Upload;
    this.baseUrl = CNAB_ONLINE_CONFIG.BASE_URL;
  }

  /**
   * Upload a file
   *
   * @param {File} file
   *
   * @returns {Promise}
   */
  uploadFile(file) {
    let defer = this.$q.defer();

    this.Upload.upload({
      url: this.baseUrl + '/file',
      data: {file: file}
    }).then(function (resp) {
      defer.resolve(resp.data);
    }, function (resp) {
      defer.reject(resp.data);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      defer.notify({
        'percentage': progressPercentage,
        'fileName': evt.config.data.file.name
      });
    });

    return defer.promise;
  }

  /**
   * Get file information by id
   *
   * @param {string} fileId
   *
   * @returns {Promise}
   */
  getFile(fileId) {
    return this.doApiRequest('GET', '/file/'+fileId);
  }

  /**
   * Get file occurrences
   *
   * @param {string} fileId
   *
   * @returns {Promise}
   */
  getOccurrences(fileId) {
    return this.doApiRequest('GET', '/file/'+fileId+'/occurrences');
  }

  /**
   * Get detailed info about file lines
   *
   * @param {string} fileId
   *
   * @returns {Promise}
   */
  getLines(fileId) {
    return this.doApiRequest('GET', '/file/'+fileId+'/lines');
  }

  /**
   * Do request to cnab online api
   *
   * @param {string} method - ex: 'POST', 'GET'
   * @param {string} endpoint - ex: '/file'
   * @param {Object} data - json body object or FormData
   *
   * @returns {Promise}
   */
  doApiRequest(method, endpoint, data) {
    let params = {
      method: method,
      url: this.baseUrl + endpoint,
      data: data
    };

    return this.$http(params).then(function(response) {
      return response.data;
    }, function(response) {
      return response.errors;
    });
  }

}

export default CnabOnlineClient;