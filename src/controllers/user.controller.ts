import bcrypt from "bcrypt";
import defineEventHandler from "./email.controller";
import db from "../dbConnection";
import {v4} from 'uuid'
import * as jwt from "jsonwebtoken"
import { IUser } from "../Dto/users.dto";
import { Request, Response } from "express";
import { QueryResult } from "pg";

export class UsersController {
    async registerUser (req: Request, res:Response){
        try{
            const { username, password, email }:IUser = req.body;

            const activatinLink:string = v4();
            defineEventHandler(email, `${process.env.API_URL}/${activatinLink}`);

            if (username && password && email){
                const hash = bcrypt.hashSync(password, 5);
                const user = await db.query('INSERT INTO users (username, password, email, confirmation_link) VALUES ($1, $2, $3, $4) RETURNING username, password, email', [username, hash, email, activatinLink]);
                res.json(user.rows)
            }else{
                res.json("fill in all columns");
            };
    }catch(err){
        throw err
    }
    }

    async authenticationUser (req: Request, res: Response) {
        try{
            const { username, password } = req.body;
            const user = (await db.query("select username from users where username=$1", [username])).rows[0]
            if (username === JSON.stringify(user).split('"')[3]) {
                const accessToken = jwt.sign( { "username": username, "password": password }, JSON.stringify(process.env.SECRET_KEY), { expiresIn: "24h" });
                res.cookie("Authorization", accessToken)
                res.json(accessToken);
            }else{
                res.json("failed authentication")
            }
        }catch(err){
            throw err 
        }
        
    };
    
    async getCurrentUser (req: Request, res: Response) {
        try{
            const token = req.cookies.Authorization;
            const {username, password}: jwt.JwtPayload = jwt.verify(token, JSON.stringify(process.env.SECRET_KEY)) as jwt.JwtPayload;
            console.log(username, password)
            if (password) {
                const curentUser = await db.query("SELECT * FROM users WHERE username=$1", [username])
                res.json(curentUser.rows);
            }else{
                res.json("failed authentication")
            }
        }catch(err){
            throw err
        }
    }

    async updateRollUser (req: Request, res: Response) {
        try{
            const userId:string = req.params.id;
            const userRole:number[] = Object.values(req.body);
            console.log(Number(userRole[0]))
            const userWithNewRole: QueryResult<IUser> = await db.query("UPDATE users SET role=$1 WHERE id=$2 RETURNING *", [Number(userRole[0]), userId]);
            res.json(userWithNewRole.rows)
        }catch(err){
            throw err 
        }
    }

    async confirmLink (req: Request) {
        try{
            const link:string = req.params.linkurl;
            await db.query('UPDATE users SET isConfirm=$1 WHERE id=$2' , [true, link])
        }catch(err){
            throw err
        }
    }
};