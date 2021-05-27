import User from '../models/User'
import Role from '../models/Role';

import jwt from 'jsonwebtoken'
import config from '../config'


export const signup = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        //comprobar si existe
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
        });

        //comprobar si se esta enviando el rol
        if (req.body.roles) {
            console.log(req.body.roles)
            //buscar si en el rol introducido por el usuario, existe ese rol en DB
            const foundRoles = await Role.find({ name: { $in: roles } });
            //almacenar solo el id del rol o roles asignado
            newUser.roles = foundRoles.map((role) => role._id)
        } else {
            //asignar role "user" por defecto
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        //Guardar el nuevo usuario
        const savedUser = await newUser.save();

        //Crear token
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400, //24 horas
        });
        console.log(newUser);
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const signin = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");
        console.log(userFound)
        if (!userFound) return res.status(400).json({ Message: "Usuario no encontrado" });

        const matchPassword = await User.compararPassword(req.body.password, userFound.password);

        if (!matchPassword)
            return res.status(401).json({
                token: null,
                message: "Password Incorrecto"
            });

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400,
        });
        res.json({ token });
    } catch (error) {
        console.log(error);
    }
};
