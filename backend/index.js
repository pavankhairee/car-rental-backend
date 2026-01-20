import express from "express"
import "dotenv/config"
import { AuthRouter } from "./routes/auth.router.js"
import { connects } from "./database.js"
const app = express()
app.use(express.json())

connects()

app.use('/auth', AuthRouter)


app.listen(3000)