import { Router } from 'express';
import * as lockerController from '../controllers/lockerController';

const router = Router();

router.get('/findAll', lockerController.findAll);
router.get(
  '/findAvailableByBloqId/:bloqId',
  lockerController.findAvailableByBloqId
);
router.get('/dropoff/:lockerId', lockerController.dropoff);
router.get('/pickup/:lockerId', lockerController.pickup);
router.patch(
  '/allocateLockerById/:lockerId',
  lockerController.allocateLockerById
);
router.patch('/freeLockerById/:lockerId', lockerController.freeLockerById);
router.post('/bulkSave', lockerController.bulkSave);
router.delete('/deleteAll', lockerController.deleteAll);
export default router;
