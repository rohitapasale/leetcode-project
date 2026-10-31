

const getcompiler = function (lang) {
  if (lang === "cpp" || lang === "c++") return "g++-15";
  if (lang.trim() === "JavaScript") return "Node.js 24";
  return "openjdk-25";
};

async function sumbitresult(compiler,code,test)
{
  try{
    const res = await fetch('https://api.onlinecompiler.io/api/run-tests/', {
  method: 'POST',
  headers: { Authorization: "40151aeeb9c41c24c57471f8758f9826", 'Content-Type': 'application/json' },
  body: JSON.stringify({
    compiler: compiler,
    code: code,
    tests: test
    //scoring: 'weighted'
  })
});
console.log("HTTP status:", res.status);
const result = await res.json();
console.log("hello ji");

return result;
  }catch(err)
  {
    res.send("error"+err);
  }


}
module.exports = {getcompiler,sumbitresult};