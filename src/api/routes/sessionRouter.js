const { Router } = require("express");
const { setupSession, createSummary } = require("../controllers/session");

const sessionRouter = Router();

sessionRouter.get("/ping", (_, res) => {
  res.send("pong session");
});

// Config
sessionRouter.post("/setup", setupSession);
sessionRouter.post("/summary", createSummary);

module.exports = sessionRouter;
