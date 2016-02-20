import 'ng-file-upload';
import CnabOnlineClient from 'app/modules/cnab-online-api/cnab-online-client.service.js';

angular
  .module('cnabOnlineApi', ['ngFileUpload'])
  .constant('CNAB_ONLINE_CONFIG', {
    'BASE_URL': 'https://cnab-online.herokuapp.com/v1'
  })
  .service('cnabOnlineClient', CnabOnlineClient);
