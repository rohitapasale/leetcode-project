
const validate_user = require("../utilis/validate_user");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const pass = process.env.pass;

async function register_user(req,res)
{
    try{
  await   validate_user(req.body);
    req.body.password = await bcrypt.hash(req.body.password,8);
    req.body.role="user";
   const user1 =  await user.create(req.body);
   const token = jwt.sign(
    {
        _id:user1._id,
        email:user1.email,
        role:"user"
    },process.env.pass,
    {
        expiresIn:60*60
    }
    
   );
   res.cookie("token",token);
   res.send("user register sucessfully");
    }
    catch(err)
    {
        res.send("error:"+err);
    }
    

}
async function login(req,res) {
    try{
       const {email,password} = req.body;
       if(!email||!password)
        throw new Error("give email and password");
        const user1 = await user.findOne(
            {
                email:email
    
            }
        )
        if(!user1)
            throw new Error("invalid credentinals");
        const valid = await bcrypt.compare(req.body.password,user1.password);
        if(!valid)
            throw new Error("invalid credentials");
    
        const token  =  jwt.sign({_id:user1._id,
            email:user1.email,
            role:user1.role
    
        },pass,
    {
        expiresIn:60*60
    });
    res.cookie("token",token);
    res.send("user login sucessfully");
    
    }
    catch(err)
    {
        res.send("error:"+err);
    }
    
}
async function adminregister(req,res) {
    
    try{
          await   validate_user(req.body);
    req.body.password = await bcrypt.hash(req.body.password,8);
    req.body.role="admin";
   const user1 =  await user.create(req.body);
   const token = jwt.sign(
    {
        _id:user1._id,
        email:user1.email,
        role:"admin"
    },process.env.pass,
    {
        expiresIn:60*60
    }
    
   );
   res.cookie("token",token);
   res.send("user register sucessfully");
    }


    
    catch(err)
    {
        res.send("error"+err);
    }
}

module.exports={register_user,login,adminregister};