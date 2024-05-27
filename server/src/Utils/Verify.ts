import { Request,Response,NextFunction } from "express";
import  jwt  from "jsonwebtoken";
const myKey = process.env.PRIVATEKEY||"MySecret"
export const VerifyJWT = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
  
    // Check if the Authorization header is missing
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }
  
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
  
    // Verify the token using the jsonwebtoken library
    jwt.verify(token, myKey, (err, payload) => {
      // If the token is invalid, return an error
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      // If the token is valid, add the user data to the request object
      req.user = payload as CustomJwtPayLoad;
      next();
    });
  };