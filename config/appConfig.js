let appConfig = {};
require("dotenv").config();

appConfig.port = process.env.port;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
  uri: process.env.db,
};
appConfig.apiVersion = "/api/v1";
appConfig.secretKey = process.env.secretKey;

module.exports = {
  port: appConfig.port,
  allowedCorsOrigin: appConfig.allowedCorsOrigin,
  environment: appConfig.env,
  db: appConfig.db,
  apiVersion: appConfig.apiVersion,
  secretKey: appConfig.secretKey,
};
