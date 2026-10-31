const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(['8.8.8.8','1.1.1.1']);
require("dotenv").config();
async function main()
{
    await mongoose.connect(process.env.db_url);
    console.log("db connected");

}

module.exports = main;