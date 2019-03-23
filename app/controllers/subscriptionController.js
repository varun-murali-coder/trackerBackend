const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')
/*Subscription Functionality*/
const webpush = require('web-push');
const appConfig=require('./../../config/appConfig');


const SubscribeModel = mongoose.model('Subscribe')

/*Subscrbing*/

let subscribe = (req, res) => {
    let blogCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log('Checking end point url'+req.body.endpoint)
            if (check.isEmpty(req.body)) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                var today = Date.now()
                let subscriptionId = shortid.generate();
                let subscriptionObject=req.body;

                let newSubscription = new SubscribeModel({

                    subscriptionId: subscriptionId,
                    subscriptionObject:subscriptionObject,
                    created: today,
                }) // end new blog model

              

                newSubscription.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Success in Subscription')
                        console.log(result);
                        resolve(result)
                    }
                }) // end new blog save
            }
        }) // end new blog promise
    } // end create blog function

    // making promise call.
    blogCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Blog Created successfully', 200, result)
            console.log(apiResponse);
            res.status(200).json({message: "Subscription added successfully."});
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

/*
let subscribe=(req,res)=>{
    let sub=req.body;
    res.set('Content-type','application/json');
    webpush.setVapidDetails('mailto:varunmurali95@yahoo.in',appConfig.publicVAPIDKEY,appConfig.privateVAPIDKEY);


    let payload=JSON.stringify({
        "notification":{
            "title":"VTRACKER ",
            "body":"Issue has comments added"
        }
    });

    Promise.resolve(webpush.sendNotification(sub,payload)).then(()=>res.status(200))
    .catch(err=>{
        console.error(err);
        res.sendStatus(500);
    })
}

*/
/*let sendNotification=(req,res)=>{
    const notificationPayload = {
        notification: {
          title: 'New Notification',
          body: 'This is the body of the notification',
          icon: 'assets/icons/icon-512x512.png'
        }
      };

      SubscribeModel.find({})
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Blog Controller: getAllBlog', 10)
                let apiResponse = response.generate(true, 'Failed To Find Blog Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Blog Found', 'Blog Controller: getAllBlog')
                let apiResponse = response.generate(true, 'No Blog Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Blog Details Found', 200, result)
                Promise.all(webpush.sendNotification(result.subscription, JSON.stringify(notificationPayload)))

                res.send(apiResponse)
            }
        })
}*/

let sendNotification=(req,res)=>{
    const notificationPayload = JSON.stringify({
        "notification": {
            "title": "VTRACKER notification",
            "body": "Some changes have been done to the ticket you are a part of",
        }
              
            
    });

    let databaseValues=SubscribeModel.find({},{"_id":0,"subscriptionObject":1}) .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Blog Controller: getAllBlog', 10)
            let apiResponse = response.generate(true, 'Failed To Find Blog Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Subscription  Found', 'Blog Controller: getAllBlog')
            let apiResponse = response.generate(true, 'No Blog Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Blog Details Found', 200, result)
            console.log('This is get operation successful for web push'+result)
            console.log('Type of result:'+typeof result+"Is Array"+Array.isArray(result));
            result.map(sub=>
                console.log('These are the itearation results:'+sub.subscriptionObject.endpoint)
                )
            Promise.resolve(result.map(sub=>webpush.sendNotification(
                sub.subscriptionObject, notificationPayload )))
                .then(() => res.status(200).json({message: 'Newsletter sent successfully.'})).catch(err => {
                    console.error("Error sending notification, reason: ", err);
                    res.sendStatus(500);
                });

        }
    })

 /*   Promise.all(SubscribeModel.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
        */
}

module.exports={
    subscribe:subscribe,
    sendNotification:sendNotification
}