export const auth = (req, res, next) => {
  try {
    if(req.headers.access_token === process.env.ACCESS_TOKEN){
      next();
    }else{
      throw 401;
    }
  } catch (error) {
    if(error == 401){
      return res.status(error).send({
        message: "Not Authorized"
      });
    }else{
      return res.status(500).send({
        message: error.message
      });
    }
  }
}
export default auth;