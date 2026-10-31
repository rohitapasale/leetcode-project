

async function  adminmiddleware(req,res,next) {
    try{
        if(req.result.role!="admin")
            throw new Error("role is not correct");
        next();

    }
    catch(err)
    {
        res.send("error:"+err);
    }
    
}
module.exports = adminmiddleware;