import InspectionSlot, { IInspectionSlot } from "../models/InspectionSlot";

class InspectionSlotsHelper {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {};

    /**
     * canBook
     */
    public static async canBook({ time }: { time: Date }): Promise<boolean> {
        
        const currentDate = new Date(); 
        // check if time is in 30 mins format.
        const allowedMinutesInterval = [0, 30];
        if (!allowedMinutesInterval.includes(time.getMinutes())) {
            throw new Error("Time is not in 30 mins bases!");
        }

        // zero being Sunday.
        const officeOffDays = [ 0 ];
        if (officeOffDays.includes(time.getDay())) {
            throw new Error("Date is out of office hours!");
        }

        // from 9AM to 6PM KL Time
        const officeWorkingHours = { from: 1, to: 10 };
        if (time.getHours() < officeWorkingHours.from || time.getHours() >= officeWorkingHours.to) {
            throw new Error("Time is out of office hours!");
        }
        
        // check if inspection is within 3 weeks.
        if ((time.getTime() - currentDate.getTime()) > 1814400000) {
            throw new Error("Time is not within 3 weeks!");
        }

        // check if inspection is within the same hour.
        if ((time.getTime() - currentDate.getTime()) <= 3600000) {
            throw new Error("Booking must be within more than an hour!");
        }
        
        // get bookings from DB.
        const from = time;
        from.setSeconds(0);
        from.setMilliseconds(0);
        const bookings = await InspectionSlot.find({ from });

        // cehck which weekday.
        const maxBookingsPerTime = time.getDay() === 6 ? 4 : 2;
        
        // cehck number of bookings available.
        if (bookings.length >= maxBookingsPerTime) {
            throw new Error("Max booking per time acceded!");
        }

        return true;
    }

    /**
     * static async getAvailable
     */
    public static async getNotAvailable(day?: Date): Promise<Array<IInspectionSlot>> {
        const currentDate = day ? new Date(day) : new Date();
        let maxDate = new Date(currentDate.getTime() + 1814400000);


        if (day) {
            maxDate = new Date(currentDate.getTime() + 86400000);
        }

        const result = await InspectionSlot.find({
            from: {
                $gte: currentDate,
                $lte: maxDate,
            },
        });


        return result;
    }
}

export default InspectionSlotsHelper;