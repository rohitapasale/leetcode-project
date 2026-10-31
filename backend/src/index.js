const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db_connection");
const cookieparse = require("cookie-parser");
const auth_route = require("./routes/auth_route");
const redisclient = require("./config/redis");
const problem_route = require("./routes/problem_route");
app.use(cookieparse());
app.use(express.json());

app.use('/user/auth',auth_route);
app.use('/problem',problem_route);
main().then( async ()=>
{
    await redisclient.connect();
  console.log("redis connected");
   // console.log("db connected");
    app.listen(process.env.port_no,()=>
    {
        console.log("listeing  "+process.env.port_no);
    })

    

}).catch((err)=>
{
    console.log("error:"+err);
})