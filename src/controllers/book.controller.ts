import { QueryResult } from "pg";
import db from "../dbConnection";

import { Ibook } from "../Dto/book.Dto";
import { Request, Response } from "express";

export class BookController {
    async addBook (req: Request, res: Response)  {
        const {title, author, publicationDate, genres} = req.body
        const book: QueryResult<Ibook> = await db.query("INSERT INTO book VALUES ($1, $2, $3, $4) RETURNING *", [title, author, publicationDate, genres])
        res.json(book.rows)
    }

    async getAllBook (res: Response) {
        const books: QueryResult<Ibook> = await db.query('SELECT * FROM book')
        res.json(books.rows)
    }

    async getBookById (req:Request, res: Response) {
        const id = req.params.id;
        const book = await db.query('select * from book WHERE id=$1', [id]);
        res.json(book.rows)
    }

    async updateBook (req:Request, res:Response){
        const id = req.params.id;
        const { title, author, publicationDate, genres } = req.body
        const updatedBook = await db.query('UPDATE book SET title=$2, author=$3, publicationDate=$4, generes=$5 where id=$1 RETURNING *', [id, title, author, publicationDate, genres]);
        res.json(updatedBook);
    }

    async deleteBook (req: Request, res:Response) {
        const id = req.params.id
        const book = await db.query('DELETE FROM book where id=$1', [id]);
        res.json(book)
    }
}

export default BookController;