import express from "express";
import { createAddress } from "../controllers/addressController.js";
const router = express.Router();



router.post("/create/:personId", createAddress)




export default router