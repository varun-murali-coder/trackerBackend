let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/trackAppDB'
  }
appConfig.apiVersion = '/api/v1';
appConfig.publicVAPIDKEY='BGipyx-30iVqiZvziwZ-DwV0cmltT-BcFqkPS02FhvOUb4p7de74kZai4vtcrDijePswGScG0RAREBBPaERkusw';
appConfig.privateVAPIDKEY='Q8Q0aa8BHUem5XjT3ZXKcS2M8nOFOjtNOX4511Ap-Ww';



module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion,
    publicVAPIDKEY:appConfig.publicVAPIDKEY,
    privateVAPIDKEY:appConfig.privateVAPIDKEY
};