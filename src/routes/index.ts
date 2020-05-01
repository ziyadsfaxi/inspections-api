import express from "express";
import { check, checkSchema } from "express-validator";

import InspectionsController from "../controllers/inspections.controller";

// Initialize the main router
const router = express.Router();


const inspectionsController = InspectionsController.getInstance();
router.get("/inspections", inspectionsController.index);
export default router;