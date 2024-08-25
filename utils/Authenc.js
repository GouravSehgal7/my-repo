const bcrypt = require('bcryptjs')
const hashpassword = async(password)=>{
    const salt= await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt);
};
const comparepass =async (password,hashpassowrd)=>{
    return await bcrypt.compare(password,hashpassowrd)
}
module.exports = { hashpassword, comparepass };