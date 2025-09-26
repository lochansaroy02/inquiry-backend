import express, { Request, Response } from 'express';
import addressRoutes from './routes/addressRoutes.js';
import checkingRoutes from './routes/checkingRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import personRoutes from './routes/personRoutes.js';

const app = express();
app.use(express.json());

// const PORT = process.env.PORT || 8080;


// app.use("/api", districtRoutes);
app.use("/checking", checkingRoutes);
app.use("/person", personRoutes);
app.use("/member", memberRoutes);
app.use("/address", addressRoutes);

app.get("/", async (req: Request, res: Response) => {
    res.json({
        message: "hello"
    })
})

app.listen(8080, () => {
    console.log(`Server is running on port ${8080}`);
});