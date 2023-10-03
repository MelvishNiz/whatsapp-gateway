import { Router } from "express";
import path from "path";
import expressBasicAuth from 'express-basic-auth';

const router = Router();

let user = process.env.IDENTITY || 'admin';
const password = process.env.PASSWORD || 'admin';

router.use(expressBasicAuth({
  users: { [user] : password },
  challenge: true,
  unauthorizedResponse: 'Unauthorized',
}));

const routes = (app) => {
  router.get('/', (req, res) => {
    res.render(process.cwd()+'/pages/index.html', {token: process.env.ACCESS_TOKEN});
  });
  return app.use("/panel", router);
};

export default routes;