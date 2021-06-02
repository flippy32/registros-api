import multer from "multer";
import File from '../models/File'
import path from 'path';
import fs from 'fs';

export async function getFile(req, res){
    const files = await File.find();
    res.json(files);
}

export async function getFiles(req, res){
    const {id} = req.params;
    const fileId = await File.findById(id);
    return res.json(fileId);
    
}

export async function createFile(req, res, err){
    const archivo = req.file
    const newFile = {
        filePath: archivo.path
    }
    const file = new File(newFile);
    console.log("lo que se esta guardando en la db: ",file);
    //guardar el filePath
    await file.save();

    console.log("archivo: ",archivo)
    if (err instanceof multer.MulterError){
        console.log('Ocurrio un error con multer')
    }else if(!archivo){
        console.log(err)
        console.log('Ocurrió un error al enviar el archivo')
        res.status(500).send({message : '******Por favor, selecciona un archivo*****'})
    }else{
    console.log('guardando file');
    console.log(req.body);
    return res.json({
        message: "Guardado con éxito", file
    });
    
}}

export async function deleteFile(req, res){
    const {id} = req.params;
    const fileId =  File.findByIdAndRemove(id);
    if (fileId){
        await fs.unlink(path.resolve(fileId.filePath));
    }
    return res.json({
        message: 'Archivo eliminado',
        fileId
    });
}

