const express = require("express");
// Routers
const { sessionRouter } = require('./routes');
//app
const api = express();

//Router config
api.get('/', (_,res)=>{
    res.json({
        data: "Api v1 is running successully" 
    })
});

//Routes
api.use('/session',sessionRouter);

module.exports = api;