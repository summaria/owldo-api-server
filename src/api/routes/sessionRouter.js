const { Router } = require('express');
const { createSession,createEasySummary } = require('../controllers/session');

const sessionRouter = Router();

sessionRouter.get('/ping', (_,res) => {
    res.send("pong session");
});

// Config
sessionRouter.post('/create',createSession);
sessionRouter.post('/easy_summary/:id',createEasySummary);

module.exports = sessionRouter;