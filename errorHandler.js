const {logTrying} = require('./learning');
const express = require('express');
const router = express.Router();
const path = require('path');
const errorHander = function (err,req,res,next) {
    logTrying(`${err.name}\t ${err.message}`, 'errorLog.txt');
    res.sendStatus(500).send(err.message);
}

router.get('/error(.html)?', (req, res) => {    
    res.sendFile(path.join(__dirname,'learning-css' ,'error.html'));
});



module.exports = router;
module.exports = errorHander ;