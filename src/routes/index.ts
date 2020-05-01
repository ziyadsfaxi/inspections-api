import express from "express";
import { check, checkSchema } from "express-validator";

import InspectionSlotsController from "../controllers/inspections.controller";

// Initialize the main router
const router = express.Router();


router.get("/inspection-slots", InspectionSlotsController.index);
router.post("/inspection-slots", InspectionSlotsController.create);
export default router;