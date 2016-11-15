/* eslint-disable no-process-env */
var env = process && process.env || {};
/* eslint-enable no-process-env */
var nodeEnvironment = env.NODE_ENV || 'local';

var settings = {
    port : 3000,
    nodeEnvironment : nodeEnvironment,
    serviceProvider : 'DWP',
    serviceName : 'UC Rota',
    serviceApi : 'http://localhost:3000/contacts',
    logLocation : 'logs',
    sessionMinutes : 20
};

// Environment specific overrides
switch (nodeEnvironment.toLowerCase()) {
case 'prod':
    settings.serviceApi = 'http://ucriskprod01.itsprod.net:8085/api';
    break;
case 'staging' :
    settings.serviceApi = 'http://riskstagapp.itsprod.net:8085/api';
    break;
case 'qa' :
    settings.serviceApi = 'http://riskqa01.itsshared.net:8085/api';
    break;
case 'local' :
    settings.serviceApi = 'http://localhost:8085/api';
    break;
case 'dev' :
    settings.serviceApi = 'http://localhost:8085/api';
    break;
case 'dev2' :
    settings.serviceApi = 'http://riskdev02.itsshared.net:8085/api';
    break;
default :
    settings.serviceApi = 'http://localhost:8085/api';
    break;
}

// Set the config object to the above settings, but respect run-time configurations from the environment variables
module.exports = {
    port : env.PORT || settings.port,
    nodeEnvironment : env.NODE_ENV,
    serviceProvider : env.SERVICE_PROVIDER || settings.serviceProvider,
    serviceName : env.SERVICE_NAME || settings.serviceName,
    serviceApi : env.SERVICE_API || settings.serviceApi,
    logLocation : env.LOG_LOCATION || settings.logLocation,
    sessionMinutes : env.SESSION_MINUTES || settings.sessionMinutes
};

