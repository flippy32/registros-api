import {Router} from "express"
import * as datoController from '../controllers/datos.controller'
import {authJwt} from '../middlewares'
const router = Router()

// router.post('/', [authJwt.verifyToken, authJwt.isSuperuser], datoController.createDato);
// router.get('/', datoController.getDatos);
// router.get('/:datoId', [authJwt.verifyToken], datoController.getDatoByID);
// router.put('/:datoId', [authJwt.verifyToken], datoController.updateDatoById);
// router.get('/search', datoController.getDatoByNuc);

router.post('/', datoController.createDato);
router.get('/', datoController.getDatos);
router.get('/:datoId', datoController.getDatoByID);
router.put('/:datoId',  datoController.updateDatoById);
router.get('/search', datoController.getDatoByNuc);



export default router;