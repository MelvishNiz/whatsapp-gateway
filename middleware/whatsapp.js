export const ready = (req, res, next) => {
  if(process.env.AUTH != "NOT_READY" && process.env.WA_AUTH == "true" && process.env.INITIALIZE == "true" && req.url != "/initialize" || req.url == "/restart"){
    next()
  }else if (req.url == "/initialize" && process.env.INITIALIZE == "false" || req.url == "/restart") {
    next();
  }else{
    return res.status(200).send({
      message: process.env.WA_STATE == "READY" ? "Client is ready" : "Client is not ready",
      state: process.env.WA_STATE,
      is_initialize: process.env.INITIALIZE == "true",
      is_auth: process.env.WA_AUTH == "true",
      is_loading: process.env.IS_LOADING == "true",
      is_ready: process.env.INITIALIZE && process.env.WA_AUTH && process.env.WA_STATE == "READY",
      qr_code: process.env.WA_QR_CODE || null,
      client_info: null
    });
  }
}