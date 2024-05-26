const { successObj, errObj, wrapErrorObj, getPrismaClient, errorResponse } = require('../../utils');

exports.getPetData = async (event) => {
    try {
        const prisma = await getPrismaClient()
        const petId = event.pathParameters.petId;

        const pet = await prisma.pet.findUnique({
            where: { id: parseInt(petId) },
        });
        if (!pet)
            throw errorResponse(
                401,
                `No Pet exists with given Id.`
            )

        const deviceData = await prisma.deviceData.findMany({
            where: { petId: parseInt(petId) },
        });

        return successObj({ deviceData })
    } catch (error) {
        return errObj(wrapErrorObj(error, "Unable to get pet data, something went wrong."))
    }
};
