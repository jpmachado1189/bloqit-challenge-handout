import { Router } from 'express';
import * as BloqController from '../controllers/bloqController';

const router = Router();

// GET Create Rent
router.get('/findAll', BloqController.findAll);
router.get('/findClosest/:address', BloqController.findClosest);
router.post('/bulkSave', BloqController.bulkSave);
router.delete('/deleteAll', BloqController.deleteAll);

export default router;
