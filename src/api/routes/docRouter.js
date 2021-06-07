const { Router } = require('express');
const { getPDFtoText} = require('../controllers/docs');

const docRouter = Router();

docRouter.get('/ping', (_,res) => {
    res.send("pong docs");
});

// Config
docRouter.get('/doc/text/:url',getPDFtoText);
module.exports = docRouter;