const date = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const id  = require('uuid').v4;
const logTrying =  async (message) =>{
    const dateTime = `${date.format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const log = `${dateTime}\t${id()}\t${message}\n`;
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs__middleware'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs__middleware'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs__middleware', 'eventLog.txt'), log);
    } catch(err){
        console.error(err);
    }
}

const logger =  (req, res, next) => {
    logTrying(`${req.method}\t ${req.headers.origin}\t${req.url}`, 'reqlog.txt');
        next();
}
module.exports = {logTrying, logger};