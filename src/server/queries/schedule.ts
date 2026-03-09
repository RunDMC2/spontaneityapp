import {db} from "~/server/db"
import { AvailabilityStatus } from "../../../generated/prisma";

// function to create new schedule entry for user
export async function createSchedule(
    userId: string, 
    buildingCode: string,
    startDateTime: Date,
    endDateTime: Date,
    status: AvailabilityStatus, // Available or Unavailable
    classCode?: string,
    locationName?: string
) {
    return db.schedule.create({
        data: {
            userId,
            buildingCode,
            startDateTime,
            endDateTime,
            status,
            classCode,
            locationName,
        },
    });
}

// function to get full schedule of specific user
export async function getScheduleForUser(userId: string) {
    return db.schedule.findMany({
        where: {userId},
        orderBy: {startDateTime: "asc"}, // sorts schedules cronologically
    });
}
