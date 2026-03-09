import {db} from "~/server/db"

// function to create new schedule entry for user
export async function createSchedule(
    userId: string, 
    startDateTime: Date,
    endDateTime: Date,
    buildingCode: string,
    classCode?: string,
    locationName?: string
) {
    return db.schedule.create({
        data: {
            userId,
            startDateTime,
            endDateTime,
            classCode,
            locationName,
            buildingCode,
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