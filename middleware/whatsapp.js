
export const ready = (req, res, next) => {
  if(process.env.AUTH != "NOT_READY" && process.env.WA_AUTH == "true" && process.env.INITIALIZE == "true" && req.url != "/initialize" || req.url == "/restart"){
    next()
  }else if (req.url == "/initialize" && process.env.INITIALIZE == "false" || req.url == "/restart") {
    next();
  }else{
    let message = "";
    let errors = [];
    switch(process.env.WA_STATE){
      case "READY":
        message = "Client is ready";
        break;
      default:
        message = "Client is not ready"
        if(!(process.env.INITIALIZE == "true")) errors.push("Initialize required");
        if(!(process.env.WA_AUTH == "true")) errors.push("Authentication required");
        break;
    }
    return res.status(200).send({
      message: message,
      errors: errors,
      state: process.env.WA_STATE,
      initialize: process.env.INITIALIZE == "true",
      is_auth: process.env.WA_AUTH == "true",
      is_loading: process.env.IS_LOADING == "true",
      is_ready: process.env.INITIALIZE && process.env.WA_AUTH && process.env.WA_STATE == "READY",
      qr_code: process.env.WA_QR_CODE || false
    });
  }
}