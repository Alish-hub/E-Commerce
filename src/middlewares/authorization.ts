import { NextFunction, Request, Response } from "express";
import { getEndPoints, getEndPoints1 } from "./getEndPointPrivilege";

export function authorize(endpoints: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      
    //@ts-ignore
      if (getEndPoints(req.user.role).includes(endpoints)) {
        next();
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    };
  }

  export function authorize1(req: Request, res: Response, next: NextFunction) {
    
      // @ts-ignore
    console.log({user:req.user.userType})
    console.log(req.path);
    //@ts-ignore

      if (getEndPoints1(req.user.userType).includes(req.path)) {
        next();
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    
  }