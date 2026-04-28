import { verifyToken } from "../utils/jwt.js";

export const protect = async(req,res,next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]; 
        }

        if(!token){
            return res.status(401).json({
                success:false,
                error:'Not Authorized, No Token Provided'
            })
        }

        try {
            const decode = verifyToken(token);
            console.log('This Is Token Decode Result',decode)
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).json({
                success:false,
                error:'Not Authorized, Invalid Token'
            })
        }
    } catch (error) {
        next(error)
    }
}