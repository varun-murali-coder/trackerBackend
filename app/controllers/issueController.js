const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')
/* Models */
const IssueModel = mongoose.model('Issue')
const CommentModel=mongoose.model('CommentModel');
const SearchModel = mongoose.model('Search')




/**
 * function to read all tickets.
 */
let getAllTickets = (req, res) => {
    IssueModel.find({})
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Issue Controller: getAllTickets', 10)
                let apiResponse = response.generate(true, 'Failed To Find All Ticket Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Ticket Found', 'Issue Controller: getAllTickets')
                let apiResponse = response.generate(true, 'No Ticket Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Ticket Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all tickets

/**
 * function to read single ticket-Issue Description Page.
 */
let viewByIssueId = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {

        let apiResponse = response.generate(true, 'issueId is missing', 403, null)
        res.send(apiResponse)
    } else {

        IssueModel.findOne({ 'issueId': req.params.issueId }, (err, result) => {

            if (err) {

                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                let apiResponse = response.generate(true, 'Ticket Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Blog found successfully","BlogController:viewByIssueId",5)
                let apiResponse = response.generate(false, 'Ticket Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to create the ticket.
 */
let createTicket = (req, res) => {
    let ticketCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.title) || check.isEmpty(req.body.assignee) || check.isEmpty(req.body.status) || check.isEmpty(req.body.reporter) ) {

                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                var today = time.now()
                let issueId = shortid.generate()

                let newTicket = new IssueModel({

                    issueId:issueId,
                    title: req.body.title,
                    assignee:req.body.assignee,
                    status: req.body.status,
                    reporter: req.body.reporter,
                    created: today,
                    lastModified: today,
                    description:req.body.description||''
                }) // end new blog model

                newTicket.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Success in ticket creation')
                        resolve(result)
                    }
                }) 
            }
        }) 
    } 

    // making promise call.
    ticketCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Ticket Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}
/*Function to edit the ticket-Issue Description Page*/
let editTicket = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {

        console.log('issueId should be passed')
        let apiResponse = response.generate(true, 'issueId is missing', 403, null)
        res.send(apiResponse)
    } else {

        let options = req.body;
        console.log(options);
        IssueModel.update({ 'issueId': req.params.issueId }, options, { multi: true }).exec((err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Ticket Not Found.')
                let apiResponse = response.generate(true, 'Ticket Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Ticket Edited Successfully')
                let apiResponse = response.generate(false, 'Ticket Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}


/**
 * function to store the comment.
 */
let createComment = (req, res) => {
    let commentCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.issueId) || check.isEmpty(req.body.comment)  ) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                var today = time.now()
                let commentId = shortid.generate()
                console.log(req.body.comment+'type of comment'+typeof req.body.comment+"Is Array"+Array.isArray(req.body.comment) )
                let newComment = new CommentModel({

                    commentId:commentId,
                    issueId:req.body.issueId,
                    comment:req.body.comment,
                    created: today,
                    lastModified: today,
                }) 

                newComment.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Success in ticket creation')
                        resolve(result)
                    }
                }) 
            }
        }) 
    } // end create comment function

    // making promise call.
    commentCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Ticket Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

/*Function to get the comments by issueId*/
let viewCommentByIssueId = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {

        console.log('issueId should be passed')
        let apiResponse = response.generate(true, 'issueId is missing', 403, null)
        res.send(apiResponse)
    } else {

        CommentModel.find({ 'issueId': req.params.issueId }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Ticket Not Found.')
                let apiResponse = response.generate(true, 'Ticket Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Blog found successfully","issueController:viewCommentByIssueId",5)
                let apiResponse = response.generate(false, 'Ticket Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}




/**
 * function to store the Watchers list.
 */
let createWatcher = (req, res) => {
    let commentCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.issueId) || check.isEmpty(req.body.userName)  ) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                var today = time.now()
                let searchId = shortid.generate()
                let newWatcher = new SearchModel({

                    searchId:searchId,
                    issueId:req.body.issueId,
                    userName:req.body.userName,
                    
                }) // end new blog model

                newWatcher.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Success in ticket creation')
                        resolve(result)
                    }
                }) 
            }
        }) 
    } 

    // making promise call.
    commentCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Ticket Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}


/*Function to get the watchers by issueId*/
let viewWatchersByIssueId = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {

        console.log('issueId should be passed')
        let apiResponse = response.generate(true, 'issueId is missing', 403, null)
        res.send(apiResponse)
    } else {

        SearchModel.find({ 'issueId': req.params.issueId }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Ticket Not Found.')
                let apiResponse = response.generate(true, 'Ticket Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Blog found successfully","issueController:viewWatchersByIssueId",5)
                let apiResponse = response.generate(false, 'Ticket Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}



module.exports = {

    getAllTickets: getAllTickets,
    createTicket: createTicket,
    viewByIssueId: viewByIssueId,
    editTicket: editTicket,
    createComment:createComment,
    viewCommentByIssueId,viewCommentByIssueId,
    createWatcher:createWatcher,
    viewWatchersByIssueId:viewWatchersByIssueId,
}// end exports

