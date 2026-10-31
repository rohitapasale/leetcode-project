const express = require("express");
const auth_route = express.Router();
const {register_user,login, adminregister} = require("../controllers/auth_controller");
const validate_user = require("../utilis/validate_user");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermiddleware = require("../middleware/usermiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");
const redisclient = require("../config/redis");

require("dotenv").config();

auth_route.post('/signin',register_user);

auth_route.post('/login',login);
auth_route.post('/logout',usermiddleware,async(req,res)=>
{
    try{
        const token = req.cookies.token;
       const payload = jwt.verify(token, process.env.pass);
         await redisclient.set(`token:${token}`,"blocked");
        await redisclient.expireAt(`token:${token}`,payload.exp);
          res.clearCookie("token");
   
res.send("log out succesfully");
    }
    catch(err)
    {
        res.send("error:"+err);
    }

})

auth_route.post('/adminregister',usermiddleware,adminmiddleware,adminregister);

module.exports = auth_route

