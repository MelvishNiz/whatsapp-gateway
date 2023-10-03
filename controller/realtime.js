import { client } from "../utils/whatsapp-client.js";
import chalk from "chalk";

let clients = []; // { id, response }
let subscribers = []; // client id

export const realtime = (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);
  
  const clientId = generateRandomId(64);

  const newClient = {
    id: clientId,
    res
  };
  
  res.write(`event: message\n`);
  res.write(`data: ${JSON.stringify({client_id: clientId})}\n\n`);
  
  clients.push(newClient);

  console.log(chalk.yellowBright("new Client :"+clientId));
  writeStreamData();
  req.on('close', () => {
    console.log(chalk.yellowBright(`${clientId} Connection closed`));
    clients = clients.filter(client => client.id !== clientId);
    subscribers = subscribers.filter(subscriber => subscriber !== clientId);
  });
}

export const subscribe = (req, res) => {
  let clientId = req.body.client_id;
  if(clientId){
    let clientExist = clients.filter((client) => client.id == clientId);
    if(clientExist.length != 0 && !subscribers.includes(clientId)){
      subscribers.push(clientId);
      writeStreamData();
      res.status(200).send({
        message: "success add id client",
      });
    }else{
      res.status(400).send({
        message: "client id already subscribe or not found",
      });
    }
  }else{
    res.status(422).send({
      message: "client_id is required",
    });
  }
}

export const writeStreamData = () => {
  clients.forEach(client => {
    if(subscribers.includes(client.id)){
      client.res.write(`event: message\n`);
      client.res.write(`data: ${JSON.stringify(getData())}\n\n`);
    }
  });
}

export const writeLog = (message) => {
  clients.forEach(client => {
    if(subscribers.includes(client.id)){
      client.res.write(`event: message\n`);
      client.res.write(`data: ${JSON.stringify({log: message})}\n\n`);
    }
  });
}

const getData = () => {
  return {
    message: process.env.WA_STATE == "READY" ? "Client is ready" : "Client is not ready",
    state: process.env.WA_STATE,
    is_initialize: process.env.INITIALIZE == "true",
    is_auth: process.env.WA_AUTH == "true",
    is_loading: process.env.IS_LOADING == "true",
    is_ready: process.env.INITIALIZE && process.env.WA_AUTH && process.env.WA_STATE == "READY",
    qr_counter: process.env.WA_QR_CODE_COUNTER || 0,
    qr_code: process.env.WA_QR_CODE || "",
    client_info: client.info
  };
}

const generateRandomId = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset[randomIndex];
  }
  return token;
}