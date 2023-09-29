import 'dotenv/config';
import express from "express";
import helmet from "helmet";

import apiRoutes from './routes/api.js';
import log from './middleware/log.js';


// init express
const app = express();
app.use(helmet());
app.use(express.json());
app.use(log);

// init routes
apiRoutes(app);

// listen  app
app.listen(process.env.PORT, () => {
  console.log(`app listen on http://localhost:${process.env.PORT}`)
})
