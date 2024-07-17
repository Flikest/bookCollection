import { Request, Response, NextFunction } from 'express';

function isAuthoraized(req: Request, res: Response, next: NextFunction) {
    console.log(req.cookies)
    const cookie = req.cookies.Authorization
    if (!cookie){
        res.json("user is not authorized")   
    }else{
        next()
    }
}


export default isAuthoraized;