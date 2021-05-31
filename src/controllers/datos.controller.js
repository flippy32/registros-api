import Datos from '../models/Datos';
import Data from '../models/Datos'

export const createDato = async (req, res)=>{
    const {
    date,
    departamento,
    avance,
    status,
    nuc,
    oficio,
    equipo,
    unidad,
    zona,
    fechaD,
    hora,
    fechaR,
    id_del,
    delito,
    num_if,
    fechaC,
    lic,
    agente,
    fechaRecol,
    dir,
    dis,
    evidencia,
    banco,
    marcaEqui,
    modeloEqui,
    serieEqui,
    marcaAlma,
    modeloAlma,
    serieAlma,
    md5,
    sha1,
    swImagen,
    swArte,
    swInfo
} = req.body;

try{
    const newDato = new Datos({
        date,
        departamento,
        avance,
        status,
        nuc,
        oficio,
        equipo,
        unidad,
        zona,
        fechaD,
        hora,
        fechaR,
        id_del,
        delito,
        num_if,
        fechaC,
        lic,
        agente,
        fechaRecol,
        dir,
        dis,
        evidencia,
        banco,
        marcaEqui,
        modeloEqui,
        serieEqui,
        marcaAlma,
        modeloAlma,
        serieAlma,
        md5,
        sha1,
        swImagen,
        swArte,
        swInfo
    });
    //almacenar el nuevo registro
    const datoSaved = await newDato.save();

    res.status(201).json(datoSaved);
}catch (error){
    console.log(error);
    return res.status(500).json(error);
}
};

export const getDatos = async (req, res)=> {
    const datos = await Data.find();
    res.json(datos);
}

export const getDatoByID = async (req, res)=> {
    const {datoId} = req.params;

    // const dato = await Data.findByID(datoId);
    const dato = await Data.findById(datoId)
    res.status(200).json(dato);
};

export const updateDatoById =async (req, res)=> {
    const datoId = req.params.datoId;
    const body = req.body;
    console.log('datoId', datoId);
    console.log('body: ', body)

    // await Data.findByIdAndUpdate(datoId, { $set: {departamento: 'flippy gay'}});
    await Data.findOneAndUpdate({_id: datoId}, {$set: {
        departamento:body.departamento, 
        avance:body.avance, 
        status:body.status, 
        nuc:body.nuc, 
        oficio:body.oficio, 
        equipo:body.equipo, 
        unidad:body.unidad, 
        zona:body.zona, 
        fechaD:body.fechaD, 
        hora:body.hora, 
        fechaR:body.fechaR, 
        id_del:body.id_del, 
        delito:body.delito, 
        num_if:body.num_if, 
        fechaC:body.fechaC, 
        lic:body.lic, 
        agente:body.agente, 
        fechaRecol:body.fechaRecol, 
        dir:body.dir, 
        dis:body.dis, 
        evidencia:body.evidencia, 
        banco:body.banco, 
        marcaEqui:body.marcaEqui, 
        modeloEqui:body.modeloEqui, 
        serieEqui:body.serieEqui, 
        marcaAlma:body.marcaAlma, 
        modeloAlma:body.modeloAlma, 
        serieAlma:body.serieAlma, 
        md5:body.md5, 
        sha1:body.sha1, 
        swImagen:body.swImagen, 
        swArte:body.swArte, 
        swInfo:body.swInfo,
    }})
    res.status(200).json('Registro actualizado OK');
};

export const getDatoByNuc = async (req, res) => {
    const {datoNuc} = req.query.search;
    const datoEncontrado = await Data.findOne(datoNuc);
    if(!datoEncontrado){
        res.status(400).json({message: "no se pudo encontrar el criterio solicitado"});
    }else{
        res.status(200).json(datoEncontrado);
    }
};