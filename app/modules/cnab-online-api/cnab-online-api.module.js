import 'ng-file-upload';
import CnabOnlineClient from 'app/modules/cnab-online-api/cnab-online-client.service.js';

angular
  .module('cnabOnlineApi', ['ngFileUpload'])
  .constant('CNAB_ONLINE_CONFIG', {
    'BASE_URL': 'http://localhost:9292/v1'
  })
  .service('cnabOnlineClient', CnabOnlineClient);