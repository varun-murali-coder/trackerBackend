const express = require('express');
const router = express.Router();
const issueController=require('./../controllers/issueController');
const appConfig = require("./../../config/appConfig")
const auth = require("./../middlewares/auth")
const path = require('path');




module.exports.setRouter = function(app){

    let baseUrl = `${appConfig.apiVersion}/tickets`;
    
    app.get(baseUrl+'/all',auth.isAuthorized,issueController.getAllTickets);
    app.get(baseUrl+'/view/:issueId',auth.isAuthorized,issueController.viewByIssueId);
    app.post(baseUrl+'/create',auth.isAuthorized,issueController.createTicket);
    app.put(baseUrl+'/:issueId/edit',auth.isAuthorized,issueController.editTicket);
    app.post(baseUrl+'/comment',auth.isAuthorized,issueController.createComment);
    app.get(baseUrl+'/comment/:issueId',auth.isAuthorized,issueController.viewCommentByIssueId);
    app.post(baseUrl+'/search',auth.isAuthorized,issueController.createWatcher);
    app.get(baseUrl+'/search/:issueId',auth.isAuthorized,issueController.viewWatchersByIssueId);
    

    



    



}



