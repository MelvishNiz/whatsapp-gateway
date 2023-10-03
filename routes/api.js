import { Router } from "express";
import { status, initialize, logout, restart, sendMessage} from "../controller/whatsapp.js";
import { body } from "express-validator";
import { ready } from "../middleware/whatsapp.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
const router = Router();

router.use(auth);
router.use(ready);

const routes = (app) => {
  router.post('/status', status);
  router.post('/initialize', initialize);
  router.post('/logout', logout);
  router.post('/restart', restart);
  router.post('/send-message', body('to').notEmpty(), body('message').notEmpty(), validate, sendMessage);

  return app.use("/api", router);
};

export default routes;