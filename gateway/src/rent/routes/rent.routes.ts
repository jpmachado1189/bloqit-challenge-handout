import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// Create new rent from outside data
router.post('/create/:address', async (req: Request, res: Response) => {
  const address = req.params.address;

  try {
    // Send data to rent service to create
    // Await response back to confirm ready for dropoff
    const { data } = await axios.post(
      `http://rent-service:3002/create/${address}`,
      req.body
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('GATEWAY - Error creating new rent.');
  }
});

// Attempt dropoff
router.post('/dropoff', async (req: Request, res: Response) => {
  const rentId = req.body.rentId;

  try {
    const { data } = await axios.post('http://rent-service:3002/dropoff', {
      rentId,
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('GATEWAY - Error dropping off rent.');
  }
});

// Attempt pickup
router.post('/pickup', async (req: Request, res: Response) => {
  const rentId = req.body.rentId;

  try {
    const { data } = await axios.post('http://rent-service:3002/pickup', {
      rentId,
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('GATEWAY - Error picking up rent.');
  }
});

// Find All
router.get('/findAll', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get('http://rent-service:3002/findAll');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error finding all Rents.');
  }
});

// Save mock data
router.post('/bulkSave', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.post(
      'http://rent-service:3002/bulkSave',
      req.body
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error saving Rent mock data.');
  }
});

// Delete All
router.delete('/deleteAll', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.delete('http://rent-service:3002/deleteAll');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error deleting all Rents.');
  }
});

export default router;
