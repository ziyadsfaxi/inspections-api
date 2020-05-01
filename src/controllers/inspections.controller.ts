import { Request, Response } from "express";

/**
 * defined as a sengleton class, hence the private constructor.
 */
class InspectionsController {
    private static instance: InspectionsController;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {};

    public static getInstance(): InspectionsController {
        if (!InspectionsController.instance) {
            InspectionsController.instance = new InspectionsController();
        }

        return InspectionsController.instance;
    }

    public async index(req: Request, res: Response): Promise<void> {
        res.sendSuccess("yaay");
    }
}


export default InspectionsController;