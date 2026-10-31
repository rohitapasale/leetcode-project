const express = require("express");
const problem_route = express.Router();
const usermiddleware = require("../middleware/usermiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");
const {create_problem,problem_submit,deleteproblembyid,getproblembyid,problemsubmision}= require("../controllers/user_problem");
const problem = require("../model/problem");
problem_route.post('/create',usermiddleware,adminmiddleware,create_problem);
problem_route.post('/problemsubmit/:problem_id',usermiddleware,problem_submit)
problem_route.post('/delete/:id',usermiddleware,adminmiddleware,deleteproblembyid);
problem_route.get('/getproblem/:id',usermiddleware,getproblembyid);
problem_route.post('/problemsubmission/:id',usermiddleware,problemsubmision)


module.exports = problem_route;
