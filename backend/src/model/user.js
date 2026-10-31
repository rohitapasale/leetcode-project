const mongoose = require("mongoose");

const user_schema = mongoose.Schema(
    {
        name:
        {
            type:String,
            reqired:true,
            unique:true,
            minLength:2,
            maxLength:20
        },
        age:
        {
            type:Number,
            min:5,
            max:80
        },
        role:
        {
            type:String,
            enum:["user","admin"],
            default:"user"

        },
        email:
        {
            type:String,
            unique:true,
            required:true,

        },
        password:
        {
            type:String,
            required:true
        },
        problemsolve:
        {
            type:[String]
        },
        bio:
        {
            type:String,
            maxLength:20
        }

    }
)
const user = mongoose.model("user",user_schema);
module.exports = user;