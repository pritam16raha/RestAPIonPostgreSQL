import express from 'express';
import controller from './controller';
const router = express.Router();


router.get('/getuser', controller.getUser);

router.get('/getuserbyid/:id', controller.getUserById);

router.post("/registeruser", controller.registerUser);

router.get("/getuserbyid/:id", controller.getUserById);

router.delete("/delete/:id", controller.deleteUserById);

router.put('/updateuser/:id', controller.updateUserById);

export default router;