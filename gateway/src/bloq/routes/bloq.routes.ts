import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// Find All
router.get('/findAll', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get('http://bloq-service:3000/findAll');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error finding all Bloqs.');
  }
});

// Find Closest
router.get('/findClosest/:address', async (req: Request, res: Response) => {
  const address = req.params.address;

  try {
    const { data } = await axios.get(
      `http://bloq-service:3000/findClosest/${address}`
    );

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('GATEWAY - Error finding closest.');
  }
});

// Save mock data
router.post('/bulkSave', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.post(
      'http://bloq-service:3000/bulkSave',
      req.body
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error saving Bloq mock data.');
  }
});

// Delete All
router.delete('/deleteAll', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.delete('http://bloq-service:3000/deleteAll');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error deleting all Bloqs.');
  }
});

export default router;
