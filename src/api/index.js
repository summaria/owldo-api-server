const express = require("express");

//app
const api = express();

//router config
api.get('/', (_,res)=>{
    res.json({
        data: "Api v1 is running successully" 
    })
});
module.exports = api;