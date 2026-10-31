const mongoose = require("mongoose");


const problem_schema =  new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true
        },
        description:
        {
            type:String,
            required:true
        },
       difficulty:
       {
        type:String,
        enum:["easy","medium","hard"]
        
       },
       tag:
       {
        type:String,
        enum:["dp","graph","array","tree"]
       },
     visibletestcases:[
        {
            input:
            {
                type:String,
                required:true
            },
            output:
            {
                type:String,
                required:true
            },
            explanation:
            {
                type:String,
                required:true
            }
        }
     ],
     hiddentestcases:[
        {
            input:
            {
                type:String,
                required:true
            },
            output:
            {
                type:String,
                required:true
            }
        }
     ],
     startcode:[
        {
            language:
            {
                type:String,
                required:true
            },
            intialcode:
            {
                type:String,
                required:true
            }
        }
     ],
     referncesolution:[
        {
            language:
            {
                type:String,
                required:true
            },
            code:
            {
                type:String,
                required:true
            }

        }
     ],
     author:
     {
        type:mongoose.Schema.Types.ObjectId,
          ref:"user",
        required:true,
     }

    }

  
)
const problem = mongoose.model("problem",problem_schema);
module.exports = problem;