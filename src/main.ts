import express, {Express} from "express";
import "dotenv/config";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import bookRouter from "./routes/book.routes"


const PORT: number = Number(process.env.PORT) || 3000;

const app: Express = express();

app.use(express.json());
app.use(cookieParser())
app.use("/books", bookRouter)
app.use("/users", userRouter);


app.listen(PORT, () => console.info(`http://localhost:${PORT}`));