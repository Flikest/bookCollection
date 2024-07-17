import * as jwt from "jsonwebtoken"
import { IUser } from "../Dto/users.dto"
import  db  from "../dbConnection"
import { genSalt, hash } from "bcrypt";
import { QueryResult } from "pg";
import { Request, Response, NextFunction } from "express";

enum roles {
    USER = "0",
    ADMIN = "100",
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.Authorization
    const { username, password } = jwt.verify(token, JSON.stringify(process.env.SECRET_KEY)) as jwt.JwtPayload;
    const user = await db.query("SELECT role FROM users WHERE username=$1 AND password=$2", [username, password]);
    if (!user as unknown as string === roles.ADMIN) {
        res.json("this is not an admin")
    }
    next()
};

export default isAdmin;