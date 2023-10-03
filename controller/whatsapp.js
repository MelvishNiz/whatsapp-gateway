import chalk from "chalk";
import { client } from "../utils/whatsapp-client.js";
import { writeStreamData } from '../controller/realtime.js';

export const status = (req, res) => {
  try {
    return res.status(200).send({
      message: process.env.WA_STATE == "READY" ? "Client is ready" : "Client is not ready",
      state: process.env.WA_STATE,
      is_initialize: process.env.INITIALIZE == "true",
      is_auth: process.env.WA_AUTH == "true",
      is_loading: process.env.IS_LOADING == "true",
      is_ready: process.env.INITIALIZE && process.env.WA_AUTH && process.env.WA_STATE == "READY",
      qr_code: null,
      client_info: client.info
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export const initialize = (req, res) => {
  try {
    client.initialize();
    process.env.INITIALIZE = true;
    return res.status(200).send({
      message: "Success Initialize",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    client.logout();
    process.env.INITIALIZE = false;
    process.env.WA_AUTH  = false;
    process.env.WA_STATE = "NOT_READY";
    process.env.WA_QR_CODE = "";
    process.env.WA_QR_CODE_COUNTER = 0;
    writeStreamData();
    return res.status(200).send({
      message: "Success Logout",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export const restart = (req, res) => {
  try {
    // destroy
    // client.destroy();
    console.log(chalk.red("Client is restartig"));
    setTimeout(()=>{
      process.exit();
    },1000)
    return res.status(200).send({
      message: "Success Restart",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export const sendMessage = (req, res) => {
  try {
    let { to, message } = req.body;
    client.sendMessage(`${to}@c.us`, message);
    return res.status(200).send({
      status: "success",
    });
  } catch (error) {
    return res.status(500).send({
      messsage: error.message,
    });
  }
};