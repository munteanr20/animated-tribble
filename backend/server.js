import express from "express"
import cors from "cors"
import {connectDB} from "./config/db.js";
import beerRouter from "./routes/beerRoute.js";


const app = express()
const port = process.env.PORT || 4000


app.use(express.json())
app.use(cors())

connectDB();
app.use("/api/beer", beerRouter)

app.get("/", (req, res) =>{
    res.send("API Working")
})

app.listen(port, () =>{
    console.log("Server started on port " + port)
})

//mongodb+srv://munteanr20:generator@cluster0.r5hn9bp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
