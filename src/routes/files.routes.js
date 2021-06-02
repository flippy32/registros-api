import {Router} from 'express'
const router = Router();
import * as fileController from '../controllers/file.controller'
import multer from '../libs/multer';

router.get('/',fileController.getFile);
router.get('/:id',fileController.getFiles);
router.post('/', multer.single('file'), fileController.createFile);
router.delete('/:id', fileController.deleteFile);
    export default router; 