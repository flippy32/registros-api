import {Router} from 'express'
const router = Router();
import * as fileController from '../controllers/file.controller'

router.get('/',fileController.getFile);
router.post('/', fileController.createFile);

    export default router; 