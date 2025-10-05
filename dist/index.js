var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cors from "cors";
import express from 'express';
import checkingRoutes from './routes/checkingRoutes.js';
const app = express();
app.use(express.json());
app.use(cors());
// const PORT = process.env.PORT || 8080 vm  ;
// app.use("/api", districtRoutes);
app.use("/checking", checkingRoutes);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "hello"
    });
}));
app.listen(8080, () => {
    console.log(`Server is running on port ${8080}`);
});
//# sourceMappingURL=index.js.map