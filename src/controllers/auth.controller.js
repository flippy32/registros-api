import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';

export const signup = async (req, res)=> {
    const {username, email, password, roles} = req.body
    //comprobar si existe
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
    });

    //comprobar si se esta enviando el rol
    if (roles){
        //buscar si en el rol introducido por el usuario, existe ese rol en DB
        const foundRoles = await Role.find({name: {$in: roles}})
        //almacenar solo el id del rol o roles asignado
        newUser.roles = foundRoles.map(role => role._id)
    }else{
        //asignar role "user" por defecto
        const role = await Role.findOne({name: "user"});
        newUser.roles = [role._id];
    }

    //Guardar el nuevo usuario
    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    })
   

    res.status(200).json({token});
};

export const signin = async (req, res)=> {
    const userFound = await User.findOne({email: req.body.emal})
    if(!userFound) return res.status(400).json({Message: "Usuario no encontrado"})
    console.log(userFound);
    res.json({token: ''});
};
