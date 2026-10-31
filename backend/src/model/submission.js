const mongoose = require("mongoose");
const { applyTimestamps } = require("./problem");

const submission_schema = mongoose.Schema(
    {
        user_id:
        {
            type:mongoose.Schema.Types.ObjectId,
            'ref':"user",
            required:true
        },
        problem_id:
        {
            type:mongoose.Schema.Types.ObjectId,
            'ref':"problem",
            required:true
        },
        language:
        {
            type:String,
            required:true
        },
        code:
        {
            type:String,
            required:true
        },
        status:
        {
            type:String,
            required:true
        },
       
        time:
        {
            type:String,
            //required:true
        },
        memory:
        {
            type:String,
           // required:true
        },
        error:{
            type:String
        },
        total_test_case:
        {
            type:String,
            required:true
        },
        test_case_pass:
        {
            type:String,
            required:true
        }
       
    }
)
submission_schema.index({user_id:1,problem_id:1});

const submission = mongoose.model("submission",submission_schema);

module.exports = submission ;