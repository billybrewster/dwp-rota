/*
 Node Server running Express and Nunjucks

 Dependencies
 --
 Node: https://nodejs.org/en/
 Express: http://expressjs.com
 Nunjucks: https://mozilla.github.io/nunjucks/
 Request : https://www.npmjs.com/package/request/    - used to simplify JSON requests
 Winston : https://www.npmjs.com/package/winston   - used for logging
 Express Sanitized:  https://www.npmjs.com/package/express-sanitized - sanitize the JS and prevent Script injection
 Body Parser: https://www.npmjs.com/package/body-parser -  Parsers the body of an object, used to parse JSON.
 Helmet : https://www.npmjs.com/package/helmet  -Security protection and middleware packages
 --
 Node acts as the server.
 Express facilitates API and middleware for the web application.
 Nunjucks is the JavaScript templating engine by Mozilla.
 */

// Import Local Dependancies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var express = require('express');
var nunjucks = require('nunjucks');
var favicon = require('serve-favicon');
var winston = require('winston');
var fs = require('fs-extra');
var helmet = require('helmet');
var async = require('async');
var expressSession = require('express-session');
var expressSanitize = require('express-sanitize-escape');
var bodyParser = require('body-parser');
var pkg = require('../package.json');
var routes;
var app = express();
// var port = process.env.PORT || 3000; // Define port to run server on
var log = console.log.bind(console); // Something to use when events are received. Save writing console.log over and over.
var env = nunjucks.configure('app/views', { // Respond to all GET requests by rendering relevant page using Nunjucks
    autoescape : true,
    cache : false,
    watch : true,
    express : app,

  tags: {
  //  blockStart: '<%',
  //  blockEnd: '%>',
    variableStart: '<$',
    variableEnd: '$>',
  //  commentStart: '<#',
  //  commentEnd: '#>'
  }
});


// load mongoose package
var mongoose = require('mongoose');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/todo-api')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var contacts = require('../app/routes/contacts');
app.use('/contacts', contacts);

var index = require('../app/routes/index');
app.use('/index', index);


 // Import Global Dependancies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
appRootDirectory = __dirname + '/..';
 config =  require(appRootDirectory + '/app/config.js');
 //routes = require(appRootDirectory + '/app/routes/');

//   P A R A L L E L     L O A D I N G  (ASYNC)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function parallel(middlewares) {
    return function(req, res, next) {
        async.each(middlewares, function(mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

//    I N I T I A L I S E     T H E     A P P L I C A T I O N
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Use Async and parallel function above to load in parallel
app.use(parallel([
    helmet(),
    helmet.xssFilter(), // Prevent XSS
    helmet.frameguard({action : 'deny'}), // Don't allow me to be in ANY frames:
    helmet.hidePoweredBy(),  // Hide 'Powered by' sent in headers
    helmet.ieNoOpen(), //Internet Explorer, restrict untrusted HTML: ieNoOpen
    helmet.noSniff(),      // Don't infer the MIME type: noSniff
    helmet.noCache(),  //Disable browser caching to stop old or buggy code being injected
    helmet.noCache({noEtag : true}),  // Disable Etag
    helmet.dnsPrefetchControl(),  //Disable browser prefetching, harms performance, but reduces vunerbilities

    // to support JSON-encoded bodies
    bodyParser.json(),

    // to support URL-encoded bodies
    bodyParser.urlencoded({extended : true}),

    // this line follows express.bodyParser() to sanitize code.
    expressSanitize(),

    // Adding the static middleware at the beginning means it wins out over any routes present
    // (but only interferes if the file exists)
    // ANY static content MUST be in the public area or it will not get served.
    express.static(appRootDirectory + '/public'),

    // Favicon locations
    favicon('public/images/favicon.ico')
]));

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(function(req, res, next) {
    res.locals.serviceProvider = config.serviceProvider;
    res.locals.serviceName = config.serviceName;
    res.locals.assetPath = /"public"/;
    next();
});

app.use(expressSession({
    secret : 'WhatWouldOddJobDo',
    saveUninitialized : false,
    resave : false,
    rolling : true,
    cookie : {
        maxAge : (config.sessionMinutes * 60 * 1000)
    }
}));

/*
if (typeof routes !== 'function') {
    log(routes.bind);
    log('Warning use of binds not working');
    routes.bind(app);
} else {
    app.use('/', routes);
}
*/

// Start server, on the port configured in the var above. Start Browser Sync.
app.listen(config.port, function() {
    log(' ');
    log('Version number: ' + pkg.version);
    log('Config:', config);
    log(' ');
});

// Gracefully handle node server kill via CTRL+C
process.on('SIGINT', function() {
    process.kill(process.pid, 'SIGTERM');
    process.exit();
});

//    G E N E R I C    D A T E    M A C R O    F U N C T I O N
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
env.addFilter('splitDate', function(str, separator, part) {
    var split;
    var returnVal = '';

    if (str) {
        split = str.split(separator);
        if (split.length === 3) {
            if (part.toLowerCase() === 'day') {
                returnVal = split[2];
            } else if (part.toLowerCase() === 'month') {
                returnVal = split[1];
            } else if (part.toLowerCase() === 'year') {
                returnVal = split[0];
            }
        }
    }
    return returnVal;
});

//    C O N F I G U R E    L O G G I N G
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
if (!fs.existsSync(config.logLocation)) {
    fs.mkdirSync(config.logLocation);
}

logger = new winston.Logger({

    transports : [
        new winston.transports.File({
            name : 'info',
            filename : config.logLocation + '/info.log',
            level : 'info'
        }),
        new winston.transports.File({
            name : 'error',
            filename : config.logLocation + '/error.log',
            level : 'error'
        }),
        new winston.transports.File({
            name : 'warn',
            filename : config.logLocation + '/warn.log',
            level : 'warn'
        })
    ]
});

//Elevate server start log so its easier to track where problems have begun.
logger.log('error', 'Logging Initialised on server start');

