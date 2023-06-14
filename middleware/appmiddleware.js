//define applicatn specific middleware
 const appmiddleware=(req,res,next)=>{
    console.log("applicatn specific middleware");
    next()
 }

module.exports={
    appmiddleware
}