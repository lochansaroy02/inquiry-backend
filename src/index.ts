import cors from "cors";
import express, { Request, Response } from 'express';
import checkingRoutes from './routes/checkingRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());


// const PORT = process.env.PORT || 8080 vm  ;


// app.use("/api", districtRoutes);
app.use("/checking", checkingRoutes);

app.get("/", async (req: Request, res: Response) => {
    res.json({
        message: "hello"


    })
})



app.listen(8080, () => {
    console.log(`Server is running on port ${8080}`);
});




