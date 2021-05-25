import {Router} from "express";
import * as authController from '../controllers/auth.controller'
import {authJwt, verifySignUp} from '../middlewares'

const router = Router()

router.post(
    '/signup', 
    /*[authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkUserOrEmailDuplicate ,verifySignUp.checkRole],*/ authController.signup
    );
    
router.post('/signin',authController.signin);




export default router;