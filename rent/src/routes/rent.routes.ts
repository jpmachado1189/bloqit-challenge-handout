import { Router } from 'express';
import * as RentController from '../controllers/rentController';

const router = Router();

router.get('/findAll', RentController.findAll);
router.post('/create/:address', RentController.create);
router.post('/dropoff', RentController.dropoff);
router.post('/pickup', RentController.pickup);
router.post('/bulkSave', RentController.bulkSave);
router.delete('/deleteAll', RentController.deleteAll);

export default router;
