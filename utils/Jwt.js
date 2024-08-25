const jwt = require('jsonwebtoken');
require('dotenv').config();
const generatetoken = (user)=>{
    const token = jwt.sign({id:user.id,emailid:user.emailid},process.env.JWT_SECRET,{expiresIn: '1h',})
    console.log(user.id);
    return token
}
const verifytoken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}
module.exports = {generatetoken,verifytoken}