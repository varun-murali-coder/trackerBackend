const express = require('express');
const router = express.Router();
const issueController=require('./../controllers/issueController');
const appConfig = require("./../../config/appConfig")
const auth = require("./../middlewares/auth")
const path = require('path');




module.exports.setRouter = function(app){

    let baseUrl = `${appConfig.apiVersion}/tickets`;
    
    app.get(baseUrl+'/all',auth.isAuthorized,issueController.getAllTickets);
    
	/**
	 * @api {get} /api/v1/tickets/all Get all tickets
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Issue Details Found",
	    "status": 200,
	    "data": [
					{
						issueId: "string",
						title: "string",
						assignee: "string",
						status: "string",
						reporter: "string",
						description: "string",
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/view/:issueId',auth.isAuthorized,issueController.viewByIssueId);
      /**
	 * @api {get} /api/v1/tickets/view/:issueId Get a single ticket
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId The blogId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Issue Found Successfully.",
	    "status": 200,
	    "data": {
	    			_id: "string",
	    			__v: number
					issueId: "string",
						title: "string",
						assignee: "string",
						status: "string",
						reporter: "string",
						description: "string",
						created: "date",
						lastModified: "date"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/create',auth.isAuthorized,issueController.createTicket);
     /**
	 * @api {post} /api/v1/tickets/create Create ticket
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} title  of the ticket passed as a body parameter
	 * @apiParam {String} description  of the ticket passed as a body parameter
	 * @apiParam {String} assignee  of the ticket passed as a body parameter
	 * @apiParam {String} reporter  of the ticket passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Ticket Created successfully",
	    "status": 200,
	    "data": [
					{
						issueId: "string",
						title: "string",
						assignee: "string",
						status: "string",
						reporter: "string",
						description: "string",
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.put(baseUrl+'/:issueId/edit',auth.isAuthorized,issueController.editTicket);

    /**
	 * @api {put} /api/v1/ticktes/:issueId/edit Edit ticket by issueId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId  of the ticket passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						issueId: "string",
						title: "string",
						assignee: "string",
						status: "string",
						reporter: "string",
						description: "string",
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/comment',auth.isAuthorized,issueController.createComment);
     /**
	 * @api {post} /api/v1/tickets/comment Create comment
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId  of the ticket passed as a body parameter
	 * @apiParam {String} comment  of the ticket passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Comment Created successfully",
	    "status": 200,
	    "data": [
					{
						issueId: "string",
						commentId: "string",
						comment: "string",
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/comment/:issueId',auth.isAuthorized,issueController.viewCommentByIssueId);
     /**
	 * @api {get} /api/v1/tickets/comment/:issueId view comment by issueId
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId  of the ticket passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Comment Pulled successfully",
	    "status": 200,
	    "data": [
					{
						issueId: "string",
						commentId: "string",
						comment: "string",
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/search',auth.isAuthorized,issueController.createWatcher);

     /**
	 * @api {post} /api/v1/tickets/search view watchers subscribed to an issue
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId  of the ticket passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Watcher Created successfully",
	    "status": 200,
	    "data": [
					{
						issueId: "string",
						searchId: "string",
						userName: "string",
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/search/:issueId',auth.isAuthorized,issueController.viewWatchersByIssueId);
    /**
	 * @api {get} /api/v1/tickets/search/:issueId view watchers subscribed to an issue
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId  of the ticket passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Watcher Created successfully",
	    "status": 200,
	    "data": [
					{
						issueId: "string",
						searchId: "string",
						userName: "string",
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    



    



}



