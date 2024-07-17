import express, { Response } from "express"
import { UsersController } from "../controllers/user.controller";
import isAuthoraized from "../middleware/isAuthorized.middleware";
import isAdmin  from "../middleware/isAdmin.middeware";

const userRouter = express.Router()
const usersController = new UsersController

userRouter.post("/register", usersController.registerUser)
userRouter.post("/login", usersController.authenticationUser)
userRouter.get("/me", isAuthoraized, usersController.getCurrentUser)
userRouter.put("/:id/role", isAuthoraized, isAdmin, usersController.updateRollUser)
userRouter.get("/confirm:linkurl", usersController.confirmLink)

export default userRouter;