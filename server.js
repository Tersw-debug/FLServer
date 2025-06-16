const path = require('path');
const {logger, logTrying} = require('./learning');
const { URL } = require('url');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const errorHander = require('./errorHandler');
const verifyJWT = require('./verfiyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./credentials');
const corsOptions = require('./config/corsOptions');
// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded());

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/', require('./roots'));
app.use('/auth', require('./auth'));
app.use('/register', require('./register'));

app.use('/refresh', require('./refresh'));
app.use('/logout', require('./logout'));

app.use(verifyJWT);
app.use('/employees', require('./employees'));

app.all('*', (req,res) => {
    res.header('anything', 'something');
    res.sendStatus(404);
    if(req.accepts('html')){
        res.type('txt').send('404 Not Found');
    }
    else{
        res.json({error: '404 Not Found'});
    }

});

app.use(errorHander);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});



































/*
const server = http.createServer((req, res) => {
    let path1;
    if(req.url == '/' || req.url == '/index.html'){
        path1 = path.join(__dirname, 'learning-css', 'index.html');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path1, (err, data) => {
            if(err){
                console.error(err);
                res.statusCode = 500;
                res.end('Error loading page');
            } else {
                res.end(data);
            }
        });
    }
    const extension = path.extname(req.url);
    if(!extension && req.url.slice(-1) !== '/') path1 += '.html';
    const exist = fs.existsSync(path1);
    if(exist){

    }
    else{
        let adder = req.url;
        q = new URL(adder);
        console.log(q);
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



myEmitter.on('log', (msg) => logTrying(msg));
myEmitter.emit('log', 'Log event emitted!');
*/