const { successObj, errObj, wrapErrorObj, getPrismaClient, errorResponse } = require('../../utils');

exports.addPetDeviceData = async (event) => {
    try {
        const prisma = await getPrismaClient()
        const { petId, deviceId } = event.pathParameters;
    
        const pet = await prisma.pet.findUnique({
            where: { id: parseInt(petId) },
        });
        if (!pet)
            throw errorResponse(
                401,
                `No Pet exists with given Id.`
            )
        const device = await prisma.device.findUnique({
            where: { id: parseInt(deviceId) },
        });
        if (!device)
            throw errorResponse(
                401,
                `No Pet exists with given Id.`
            )

        // Parse request body
        const {
        latitude,
        longitude,
        accuracy,
        stepsCount,
        activeMinutes,
        intensityLevel,
        sleepPattern,
        feedingHabits,
        } = JSON.parse(event.body);

        // Create device data record
        const newDeviceData = await prisma.deviceData.create({
        data: {
            timestamp: new Date(),
            latitude,
            longitude,
            accuracy,
            stepsCount,
            activeMinutes,
            intensityLevel,
            sleepPattern,
            feedingHabits,
            device:{
                connect: device
            },
            pet:{
                connect: pet
            }
        },
        });
        return successObj({ success: "Pet device data updated successfully", newDeviceData })
    } catch (error) {
        return errObj(wrapErrorObj(error, "Unable to add pet device data, something went wrong."))        
    }
}
