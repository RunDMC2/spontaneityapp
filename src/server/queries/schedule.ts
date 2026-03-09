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