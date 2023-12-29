const jwt=require("jsonwebtoken");
require("dotenv").config()


const auth=(req,res,next)=>{
try {
    const token=req.headers.authorization?.split(" ")[1];

    if (token){
        const decoded=jwt.verify(token,process.env.secretKey,{
            expiresIn:120
        });

            if (decoded){
                req.body.creator=decoded.userID;
                next()

            }
            else{
                return res.status(404).json({msg:"token is invalid"})

            }

    }
    else{
        return res.status(404).json({msg:"token not found"})
    }
} catch (error) {
    res.status(500).json({error:error.message})

}
}


module.exports={auth}