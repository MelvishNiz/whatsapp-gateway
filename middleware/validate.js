import { validationResult } from 'express-validator';
export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  }else{
    return res.status(422).send({
      errors: result.array()
    });
  }
}
export default validate;