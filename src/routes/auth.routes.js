import {Router} from "express";
import * as authController from '../controllers/auth.controller'
import {authJwt, verifySignUp} from '../middlewares'

const router = Router()

router.post(
    '/register', 
    [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkUserOrEmailDuplicate ,verifySignUp.checkRole],authController.signup
    );
    
router.post('/login',authController.signin);
router.delete('/logout', authController.logout);



export default router;