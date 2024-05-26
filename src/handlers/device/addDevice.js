const { errObj, wrapErrorObj, getPrismaClient, successObj } = require('../../utils');

exports.addDevice = async (event) => {
    try {
        const prisma = await getPrismaClient();
        const {  type, status } = JSON.parse(event.body);

        const newDevice = await prisma.device.create({
            data: {
                type,
                status,
            },
        });

        return successObj({ success: "Device data added successfully", newDevice })
    } catch (error) {
        return errObj(wrapErrorObj(error, "Unable to add device data, something went wrong."))    
    }
};
