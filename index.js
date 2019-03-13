const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const fs=require('fs');
const app=express();
const http=require('http');
const appConfig=require('./config/appConfig');
const logger=require('./app/libs/loggerLib');
const routeLoggerMiddlewares=require('./app/middlewares/routeLogger');
const globalErrorHandlerMiddleware=require('./app/middlewares/appErrorHandler');
const mongoose=require('mongoose');
const morgan=require('morgan');

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')));
app.use(routeLoggerMiddlewares.logIp)
app.use(globalErrorHandlerMiddleware.globalErrorHandler);

app.use(express.static(path.join(__dirname,'client')));

const modelsPath='./app/models';
const controllersPath='./app/controllers';
const libsPath='./app/libs';
const middleWaresPath='./app/middlewares';
const routesPath='./app/routes';

app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,')
    next();

})

//Bootstrap models
fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js'))
    require(modelsPath+'/'+file);
})

//Bootstrap route
fs.readdirSync(routesPath).forEach(function(file){
if(~file.indexOf('.js')){
    let route=require(routesPath+'/'+file);
    route.setRouter(app);
}

})

// calling global 404 handler after route
    app.use(globalErrorHandlerMiddleware.globalNotFoundHandler);

    /*Create http server*/
    const server=http.createServer(app);
    //start listening to http server.
    console.log(appConfig);
    server.listen(appConfig.port);
    server.on('error',OnError);
    server.on('listening',OnListening);

    //end server listening code

    // socket io connection handler 
//const socketLib = require("./app/libs/socketLib");
//const socketServer = socketLib.setServer(server);


// end socketio connection handler


    function OnError(error){

        if(error.syscall!=='listen'){
            logger.error(error.code+'not equal listen','ServerOnErrorHandler',10);
            throw error;
        }
         // handle specific listen errors with friendly messages
  
  switch(error.code){
      case 'EACCESS':
      logger.error(error.code+"elevated privileges required",'ServerOnErrorHandler',10);
      process.exit(1);
      break;
      case 'EADDRINUSE':
      logger.error(error.code+"port already in use",'ServerOnErrorHandler',10);
      process.exit(1);
      break;
      default:
      logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
      throw error;
  }
    }
    /**
 * Event listener for HTTP server "listening" event.
 */
function OnListening(){
    var addr=server.address;
    var bind =typeof addr==='string'?
    'pipe'+addr:'port'+addr.port;
    ('Listening on'+bind);
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
   let db=mongoose.connect(appConfig.db.uri,{useNewUrlParser:true});
}



process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });

  /**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
    logger.error(err,
      'mongoose connection on error handler', 10)
    //process.exit(1)
  }); // end mongoose connection error
  
  mongoose.connection.on('open', function (err) {
    if (err) {
      console.log("database error");
      console.log(err);
      logger.error(err, 'mongoose connection open handler', 10)
    } else {
      console.log("database connection open success");
      logger.info("database connection open",
        'database connection open handler', 10)
    }
    //process.exit(1)
  }); // enr mongoose connection open handler
  

  module.exports=app;
   
