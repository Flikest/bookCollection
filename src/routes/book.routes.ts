import express from "express"
import BookController from "../controllers/book.controller"
import isAdmin from "../middleware/isAdmin.middeware"

const bookRouter = express.Router()
const bookController = new BookController

bookRouter.post("/", isAdmin, bookController.addBook)
bookRouter.get("/", bookController.getAllBook)
bookRouter.get("/:id", bookController.getBookById) 
bookRouter.put("/:id", isAdmin, bookController.updateBook)
bookRouter.delete("/:id", bookController.deleteBook)

export default bookRouter;