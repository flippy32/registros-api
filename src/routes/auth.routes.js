import {Router} from "express";
import * as authController from '../controllers/auth.controller'
import {authJwt, verifySignUp} from '../middlewares'

const router = Router()

router.post(
    '/signup', 
    [verifySignUp.checkUserOrEmailDuplicate ,verifySignUp.checkRole, authJwt.verifyToken, authJwt.isAdmin ],
    authController.signup,
    );
    
router.post('/signin',authController.signin);




export default router;