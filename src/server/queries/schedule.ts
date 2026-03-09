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

// function to retrive availability based on specific time
// !!!FOR CAMPUS GRAPH ALGORITHM!!!
export async function userAvailabilityAtTime(userId: string, time: Date) {
    const scheduleEntry = await db.schedule.findFirst({
        where: {
            userId,
            startDateTime: {lte: time},
            endDateTime: {gt:time}
        },
        select: {status: true}
    });

    // if user has no schedule at that time -> they are neither availbale/unavailable -> return false
    if (!scheduleEntry) {
        return false;
    }

    return scheduleEntry.status === AvailabilityStatus.AVAILABLE; // if availble returns true 
}