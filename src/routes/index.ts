import express from "express";
import { check, checkSchema } from "express-validator";

import InspectionSlotsController from "../controllers/inspections.controller";

// Initialize the main router
const router = express.Router();


const inspectionSlotsController = InspectionSlotsController.getInstance();
router.get("/inspection-slots", inspectionSlotsController.index);
export default router;