import chalk from 'chalk';
import 'dotenv/config';
import Whatsapp from 'whatsapp-web.js'
const { Client, LocalAuth  } = Whatsapp;

process.env.WA_QR_CODE = "";
process.env.WA_STATE = "NOT_READY";
process.env.WA_AUTH  = false;

let config = {
  authStrategy: new LocalAuth({ clientId: "client-one" })
};

switch(process.env.SERVER_OS){
  case "WINDOWS":
    let isHeadless = process.env.HEADLESS == undefined ;
    if(process.env.HEADLESS == undefined){
      isHeadless = true;
    }else{
      isHeadless = process.env.HEADLESS == 'true';
    }
    config.puppeteer = {
      headless: isHeadless,
    };
    break;
  default:
    config.puppeteer = {
      headless: true,
      args: ['--no-sandbox --disable-setuid-sandbox'],
    };
    break;
}

export const client = new Client(config);

// init
client.initialize();
process.env.INITIALIZE = true;
process.env.IS_LOADING = true;

// Listen Events
client.on('loading_screen', (percent, message) => {
  console.log(chalk.yellow('LOADING SCREEN', percent, message));
  if(percent == 100) process.env.IS_LOADING = false;
});

client.on('qr', (qr) => {
  process.env.WA_QR_CODE = qr;
  console.log(chalk.green("QR CODE RECEIVE"))
});

client.on('authenticated', () => {
  process.env.WA_AUTH = true;
  console.log(chalk.green('AUTHENTICATED'));
});

client.on('auth_failure', (msg) => {
  process.env.WA_AUTH = false;
  console.log(chalk.red('AUTHENTICATION FAILURE', msg));
});

client.on('ready', () => {
  process.env.WA_AUTH  = true;
  process.env.WA_STATE = "READY";
  process.env.WA_QR_CODE = "";
  console.log(chalk.green('Client is ready'))
});

client.on('disconnected', (reason) => {
  process.env.WA_AUTH  = false;
  process.env.WA_STATE = "NOT_READY";
  process.env.WA_QR_CODE = "";
  console.log(chalk.red('Client was logged out', reason));
});