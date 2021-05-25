import config from '../config';
import jwt from 'jsonwebtoken'
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        console.log(token);

        //ver si se esta recibiendo el token
        if (!token) return res.status(403).json({ message: "Token no valido" });

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        //comprobar si el usuario es valido

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        next();
    } catch (error) {
        return res.status(500).json({ message: "no autorizado" })
    }
};
//verificar el tipo de token
//si es superuser...
export const isSuperuser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "superuser") {
                next();
                return;
            }
        };

        return res.status(403).json({ message: "No autorizado, necesita ser SuperUser" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};

//si es admin
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        };
        return res.status(403).json({ message: "No autorizado, necesita ser Administrador" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }
};