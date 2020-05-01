import express from "express";
import { checkSchema } from "express-validator";

import InspectionSlotsController from "../controllers/inspections.controller";
import RequestBodyValidator from "../middlewares/requestBodyValidator.middleware";
import * as inspectSlotValidator from "../validators/inspectionSlot.validator";

// Initialize the main router
const router = express.Router();

router.get("/inspection-slots", InspectionSlotsController.index);
router.get("/inspection-slots/available", InspectionSlotsController.getAvailable);
router.post("/inspection-slots", checkSchema(inspectSlotValidator.create), RequestBodyValidator.check, InspectionSlotsController.create);
export default router;
