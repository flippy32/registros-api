
export function getFile(req, res){
    console.log('ingresando al getFile')
}


export function createFile(req, res){

    console.log('guardando file')
    console.log(req.body);
    return res.json({
        message: "Guardado con éxito"
    });
}