const express = require('express');
const router = express.Router();
const subscriptionController=require('./../controllers/subscriptionController');
const appConfig = require("./../../config/appConfig")
const auth = require("./../middlewares/auth")
module.exports.setRouter = function(app){

    let baseUrl = `${appConfig.apiVersion}`;
    
    
    app.post(baseUrl+'/subscription',subscriptionController.subscribe);
    app.post(baseUrl+'/sendNotification',subscriptionController.sendNotification);



}