const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'learning-css','index1.html'));
});

router.get('/learning-css/index(.html)?', (req,res) =>{
    res.sendFile(path.join(__dirname,'learning-css','index1.html'));

});

router.get('/learning-css/index1(.html)?', (req,res) =>{
    res.sendFile(path.join(__dirname,"learning-css","index1.html"));
    
});

router.get('/learning/index1(.html)?', (req,res) =>{
    res.redirect(path.join(__dirname,"learning-css","index1.html"));
    
});


module.exports = router;