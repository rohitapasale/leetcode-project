
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const redisclient = require("../config/redis");
require("dotenv").config();
async function usermiddleware(req,res,next)
{
    try{
    const token = req.cookies.token ;
    if(!token)
        throw new Error("user not exist");
   const payload = jwt.verify(token, process.env.pass);
    if(!payload)
        throw new Error("invalid token");
    const user1 = await user.findOne(
        {
            _id:payload._id
        }
    );
    if(!user1)
        throw new Error("user not exist");
    req.result = user1;
    const blocked = await redisclient.exists(`token:${token}`);
    if(blocked)
        throw new Error("invalid user");
    next();

 }
catch(err)
{
    res.send("error:"+err);
}
}

module.exports = usermiddleware;