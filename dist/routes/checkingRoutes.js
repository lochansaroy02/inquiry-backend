import express from "express";
import { createChecking, getChecking } from "../controllers/checkingController.js";
const router = express.Router();
router.get("/fetch", getChecking);
router.post("/create", createChecking);
export default router;
//# sourceMappingURL=checkingRoutes.js.map