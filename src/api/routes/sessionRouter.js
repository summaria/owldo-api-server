const { Router } = require('express');
const { createSession } = require('../controllers/session');

const sessionRouter = Router();

sessionRouter.get('/ping', (_,res) => {
    res.send("pong session");
});

// Config
sessionRouter.post('/create',createSession);

module.exports = sessionRouter;