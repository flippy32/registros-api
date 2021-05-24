import Data from '../models/Datos'

export const createDato = (req, res)=>{

}

export const getDatos = async (req, res)=>{
    const datos = await Data.find();
    res.json("GET DATOS");
}

export const getDatoByID = (req, res)=>{
    
}

export const updateDatoById = (req, res)=>{
    
} 