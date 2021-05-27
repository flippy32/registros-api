import {Router} from "express"
import * as datoController from '../controllers/datos.controller'
import {authJwt} from '../middlewares'
const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isSuperuser], datoController.createDato);
router.get('/', datoController.getDatos);
router.get('/:datoId', [authJwt.verifyToken], datoController.getDatoByID);
router.put('/:datoId', [authJwt.verifyToken], datoController.updateDatoById);
router.get('/search/:nuc',[authJwt.verifyToken], datoController.getDatoByNuc);



export default router;