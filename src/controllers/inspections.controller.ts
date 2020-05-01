import { Request, Response } from "express";

/**
 * defined as a sengleton class, hence the private constructor.
 */
class InspectionSlotsController {
    private static instance: InspectionSlotsController;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {};

    public static getInstance(): InspectionSlotsController {
        if (!InspectionSlotsController.instance) {
            InspectionSlotsController.instance = new InspectionSlotsController();
        }

        return InspectionSlotsController.instance;
    }

    public async index(req: Request, res: Response): Promise<void> {
        res.sendSuccess("yaay");
    }
}


export default InspectionSlotsController;