import express from "express";
import { createChecking, } from "../controllers/checkingController.js";
const router = express.Router();



router.post("/create", createChecking)



export default router