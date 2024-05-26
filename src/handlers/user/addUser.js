const { errObj, wrapErrorObj, getPrismaClient, successObj } = require('../../utils');

exports.addUser = async (event) => {
    try {
        const prisma = await getPrismaClient();
        const { email, name, role } = JSON.parse(event.body);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                role
            },
        });

        return successObj({ success: "User data added successfully", newUser })
    } catch (error) {
        return errObj(wrapErrorObj(error, "Unable to add User data, something went wrong."))    
    }
};
