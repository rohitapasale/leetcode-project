
const {getcompiler,sumbitresult }= require("../utilis/problem_utility");
const problem = require("../model/problem");
const submission = require("../model/submission");

async function create_problem(req,res)
{

    try{
    const {title,description,difficulty,tag,visibletestcases,hiddentestcases,startcode,referncesolution} = req.body;
    if (
    !title ||
    !description ||
    !difficulty ||
    !tag ||
    !visibletestcases ||
    !hiddentestcases ||
    !startcode ||
    !referncesolution
) {
    return res.status(400).send("Fields are missing");
}
    for(const {language,code} of referncesolution)
    {
        // compiler,code,tests
        // test => format 
        const compiler = getcompiler(language);
        // now want test only 
        const test = [];
        // test create here
        for(const {input,output} of visibletestcases)
        {
            const obj = {
                input:input,
                expected_output:output
            };
            test.push(obj);
        }
        const result = await sumbitresult(compiler, code, test);

console.log("Compiler:", compiler);
console.log("Tests sent:", test);
console.log("Compiler result:", JSON.stringify(result, null, 2));

const allPassed =
    result?.verdict === "accepted" &&
    result?.tests?.length === test.length &&
    result.tests.every(t => t.verdict === "accepted");

if (!allPassed) {
    return res.status(400).json({
        message: "Reference solution validation failed",
        result
    });
}
  
}

// now store in db 
  await problem.create(
        {
            ...req.body,
            author:req.result._id
        }
    )

    res.send("problem saved sucessfully");
    
    }
    catch(err)
    {
        res.send("error:"+err);
    }
    

}

async function problem_submit(req,res)
{
  
    try{
  const    {problem_id} = req.params;
    const {language,code} = req.body ;
    const p = await problem.findById(problem_id);
    if(!p)
        throw new Error("problem not exist");

     const compiler = getcompiler(language);
     const {visibletestcases} =p;
       const test = [];
        // test create here
        for(const {input,output} of visibletestcases)
        {
            const obj = {
                input:input,
                expected_output:output
            };
            test.push(obj);
        }
       const result = await sumbitresult(compiler, code, test);
       if (!result || result.error) {
    return res.status(502).json({
        message: "Compiler API failed",
        result
    });
}
      const sub = {};
      sub.user_id =  req.result.id;
      sub.problem_id = problem_id;
      sub.code = code;
      sub.language = language;

  if(result.verdict=="internal_error")
  {
    sub.status = "pending";
  }
 if(result.verdict=="accepted"){
  
sub.status = "accepted";
let time1 =0,memory1=0
let tc=0;
for(let {time,memory} of result.tests)
{
    time1 = Math.max(time,time1);
    memory1 = Math.max(memory,memory1)
    tc++;
}
sub.time = time1;
sub.memory = memory1;
sub.total_test_case = tc;
sub.test_case_pass = tc;


  }
  else
  {
    sub.status = result.verdict;
    sub.error = result.verdict;
   
let tc=0;
let pass=0;
for(let {t,m,verdict} of result.tests)
{
    
    if(verdict=="accepted")
        pass++;
}

sub.total_test_case = tc;
sub.test_case_pass = pass;
}

  await submission.create(sub);
 res.send(sub);



    }
catch(err)
{
    res.send("error:"+err);
}    


}
async function deleteproblembyid(req,res) {
try{
const {id} = req.params;
const p = await problem.findByIdAndDelete(id);
if(!p)
    throw new Error("problem not exist");

await submission.deleteMany(p.problem_id);
res.send("problem deleted sucessfully");

}
catch(err)
{
    res.send(err);
}
}
async function getproblembyid(req,res)
{
    try{
    const {id}=req.params;
       const p = await problem.findById(id)
            .select("title description difficulty tag visibletestcases");
    if(!p)
        throw new Error("problem not exist");
    res.send(p);
}
catch(err)
{
    res.send("error:"+err);
}

}
async function problemsubmision(req,res)
{
    try{
    const problem_id = req.params.id;
    const user_id = req.result._id;
    const result = await submission.find({problem_id:problem_id,user_id:user_id});
    
    res.send(result);
    }
    catch(err)
    {
        res.send("error"+err);
    }
}
module.exports = {create_problem,problem_submit,deleteproblembyid,getproblembyid,problemsubmision};


/*
test = [
{
input:{},
output:{}
},
{
input:
output}
,{
input:,
output:}
]

*/

