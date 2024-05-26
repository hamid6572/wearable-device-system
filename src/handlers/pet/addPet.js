const { successObj, wrapErrorObj, getPrismaClient, errObj, errorResponse } = require('../../utils');

exports.addPet = async (event) => {
    try {
        const prisma = await getPrismaClient();
        const { name, species, breed, age, ownerId, deviceId } = JSON.parse(event.body);

        const user = await prisma.user.findUnique({
            where: { id: parseInt(ownerId) },
        });
        if (!user)
            throw errorResponse(
                401,
                `No User exists with given Id.`
            )

        const device = await prisma.device.findUnique({
            where: { id: parseInt(deviceId) },
        });
        if (!device)
            throw errorResponse(
                401,
                `No Device exists with given Id.`
            )

        const newPet = await prisma.pet.create({
            data: {
                name,
                species,
                breed,
                age,
                ownerId,
                deviceId
            },
        });

        return successObj({ success: "Pet data added successfully", newPet })
    } catch (error) {
        return errObj(wrapErrorObj(error, "Unable to add Pet data, something went wrong."))    
    }
};
