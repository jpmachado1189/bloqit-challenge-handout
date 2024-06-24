import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// Find Available Locker by Bloq ID
router.get(
  '/findAvailableByBloqId/:bloqId',
  async (req: Request, res: Response) => {
    try {
      const bloqId = req.params.bloqId;
      if (!bloqId) {
        throw new Error('No Bloq ID provided.');
      }

      const { data } = await axios.get(
        `http://locker-service:3001/findAvailableByBloqId/${bloqId}`
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(500).send('GATEWAY - Error fetching lockers by bloq ID.');
    }
  }
);

// Allocate Locker by id
router.patch(
  '/allocateLockerById/:lockerId',
  async (req: Request, res: Response) => {
    try {
      const lockerId = req.params.lockerId;

      if (!lockerId) {
        throw new Error('No Locker ID provided.');
      }

      const { data } = await axios.patch(
        `http://locker-service:3001/allocateLockerById/${lockerId}`
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(500).send('GATEWAY - Error allocating Locker by ID.');
    }
  }
);

// Free Locker by id
router.patch(
  '/freeLockerById/:lockerId',
  async (req: Request, res: Response) => {
    try {
      const lockerId = req.params.lockerId;

      if (!lockerId) {
        throw new Error('No Locker ID provided.');
      }

      const { data } = await axios.patch(
        `http://locker-service:3001/freeLockerById/${lockerId}`
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(500).send('GATEWAY - Error freeing Locker by ID.');
    }
  }
);

// Find All
router.get('/findAll', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get('http://locker-service:3001/findAll');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error finding all Lockers.');
  }
});

// Save mock data
router.post('/bulkSave', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.post(
      'http://locker-service:3001/bulkSave',
      req.body
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error saving Locker mock data.');
  }
});

// Dropoff
router.get('/dropoff/:lockerId', async (req: Request, res: Response) => {
  try {
    const lockerId = req.params.lockerId;

    const { data } = await axios.get(
      `http://locker-service:3001/dropoff/${lockerId}`
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error dropping off Rent on Locker.');
  }
});

// Pick Up
router.get('/pickup/:lockerId', async (req: Request, res: Response) => {
  try {
    const lockerId = req.params.lockerId;

    const { data } = await axios.get(
      `http://locker-service:3001/pickup/${lockerId}`
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error picking up Rent on Locker.');
  }
});

// Delete All
router.delete('/deleteAll', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.delete('http://locker-service:3001/deleteAll');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error deleting all Lockers.');
  }
});

export default router;
