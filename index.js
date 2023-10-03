import 'dotenv/config';
import express from "express";
import ejs from 'ejs';
import helmet from "helmet";

import webRoutes from './routes/web.js';
import apiRoutes from './routes/api.js';
import realtimeRoutes from './routes/realtime.js'
import log from './middleware/log.js';
import chalk from 'chalk';

// init express
const app = express();
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(log);

// init routes
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static('public'))
webRoutes(app);
apiRoutes(app);
realtimeRoutes(app);

// listen  app
app.listen(process.env.PORT, () => {
  console.log(chalk.greenBright(`app listen on http://localhost:${process.env.PORT}`));
  console.log(chalk.greenBright(`PANEL : http://localhost:${process.env.PORT}/panel`));
  console.log(chalk.greenBright(`API   : http://localhost:${process.env.PORT}/api`));
  console.log(chalk.greenBright(`SSE   : http://localhost:${process.env.PORT}/sse`));
})
