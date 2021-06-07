const express = require("express");
// Routers
const { docRouter } = require('./routes');
//app
const api = express();

//Router config
api.get('/', (_,res)=>{
    res.json({
        data: "Api v1 is running successully" 
    })
});

//Routes
api.use('/docs',docRouter);

module.exports = api;