const validator = require("validator");

async function validate_user(data)
{
    const mendatory = ["name","email","password"];
    const valid = mendatory.every((k)=> 
    {
        return Object.keys(data).includes(k);
    })
    if(!valid)
        throw new Error("data not present");
    if(!validator.isEmail(data.email))
        throw new Error("not correct email");
        

}



module.exports = validate_user;