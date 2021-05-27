import { ROLES } from '../models/Role'
import User from '../models/User'

//verificar que no se cree un usuario con email ya existente
export const checkUserOrEmailDuplicate = async (req, res, next) => {
    try {
        //verificar por username
        const user = await User.findOne({ username: req.body.username });
        if (user) 
            return res.status(400).json({ message: "El usuario ya existe" });

        //verificar por email
        const email = await User.findOne({ email: req.body.email });
        if (email) 
            return res.status(400).json({ message: "El email ya existe" });

        next();
    } catch (error) {
        res,status(599).json({ message: error});
    }
};

//verificar que se asigne un rol correcto al crear un usuario
export const checkRole = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: 'Los roles ingresados no existen'
                });
            }
        }
    }
    next();
};

