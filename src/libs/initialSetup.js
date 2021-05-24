import Role from '../models/Role'

export const createRoles = async () => {
    try {
        const contador = await Role.estimatedDocumentCount()

        if (contador > 0) return;

        //ejecutar todas las funciones al mismo tiempo
        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'superuser' }).save(),
            new Role({ name: 'admin' }).save()
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
};