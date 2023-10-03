import { Router } from "express";
import { realtime, subscribe } from "../controller/realtime.js";
import auth from "../middleware/auth.js";
const router = Router();

const routes = (app) => {
  router.get('/realtime', realtime);
  router.post('/subscribe', auth, subscribe);

  return app.use("/sse", router);
};

export default routes;