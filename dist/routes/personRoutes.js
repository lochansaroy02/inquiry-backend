import express from "express";
import { createPerson, fetchPerson } from "../controllers/personController.js";
const router = express.Router();
router.post("/create", createPerson);
router.get("/fetch", fetchPerson);
export default router;
//# sourceMappingURL=personRoutes.js.map