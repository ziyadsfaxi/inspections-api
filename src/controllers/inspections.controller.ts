import { Request, Response } from "express";
import InspectionSlot from "../models/InspectionSlot";
import InspectionSlotsHelper from "../helpers/InspectionSlots.helper";

/**
 * defined as a sengleton class, hence the private constructor.
 */
class InspectionSlotsController {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {};

    public static async index(req: Request, res: Response): Promise<void> {
        try {
            const slots = await InspectionSlot.find();

            res.sendSuccess(slots);
        } catch (error) {
            console.log(error);
            res.sendError(error.message);
        }
    }

    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const inspectionSlot = new InspectionSlot({...req.body});

            const canBook = await InspectionSlotsHelper.canBook({ time: inspectionSlot.from });
            
            if (!canBook) {
                throw new Error("booking is invalid");
            }

            const result = await inspectionSlot.save();
            
            res.sendSuccess(result);
            
        } catch (error) {
            console.log(error.message);
            res.sendError(error.message);
        }

        
    }
}


export default InspectionSlotsController;