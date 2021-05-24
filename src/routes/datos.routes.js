import {Router} from "express"
import * as datoController from '../controllers/datos.controller'

const router = Router()

router.post('/', datoController.createDato);
router.get('/', datoController.getDatos);
router.get('/:datoId', datoController.getDatoByID);
router.put('/:datoId', datoController.updateDatoById);



export default router;