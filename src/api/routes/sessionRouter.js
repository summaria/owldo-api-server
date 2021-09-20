const { Router } = require("express");
const { setupSession, createEasySummary } = require("../controllers/session");

const sessionRouter = Router();

sessionRouter.get("/ping", (_, res) => {
  res.send("pong session");
});

// Config
sessionRouter.post("/setup", setupSession);
sessionRouter.post("/easy_summary", createEasySummary);

module.exports = sessionRouter;
