const { body, validationResult } = require('express-validator');

const registerRules=[
    body('pseudo','Pseudo incorrect ou déjà pris').notEmpty(),
    body('email','Email incorrect').isEmail(),
    body('password',"Le mot de passe doit faire 6 caractères minimum").isLength({min:6})
]
const loginRules=[
  body('email','Email incorrect').isEmail(),
  body('password',"Le mot de passe doit faire 6 caractères minimum").isLength({min:6})
]

const validator=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}
module.exports={registerRules,validator,loginRules}