import { Request, Response } from 'express';
import BloqModel from '../models/BloqModel';

// Find closest
export const findClosest = async (req: Request, res: Response) => {
  // MOCK request body must include order's address
  // MOCK convert address to coordinates
  // MOCK use google maps api to compare addresses and find  n-closest location
  // MOCK would be interesting to save coordinates on new bloq and categorize locations numerically
  // MOCK and then creating a data structure to improve performance when finding closest

  // Returning hard coded ID from mock data for convenience
  res.status(200).send('c3ee858c-f3d8-45a3-803d-e080649bbb6f');
};

// Find All
export const findAll = async (req: Request, res: Response) => {
  try {
    const bloqs = await BloqModel.find({});
    res.status(200).send(bloqs);
  } catch (error) {
    res.status(500).send('Error finding all Bloqs');
  }
};

// Bulk Save
export const bulkSave = async (req: Request, res: Response) => {
  try {
    const mockData = req.body;
    const createdBloqs = await BloqModel.insertMany(mockData);

    res.status(201).send(createdBloqs);
  } catch (error) {
    res.status(500).send('Error bulk saving Bloq data.');
  }
};

// Delete all
export const deleteAll = async (req: Request, res: Response) => {
  try {
    await BloqModel.deleteMany({});

    res.status(200).send('Every Bloq deleted.');
  } catch (error) {
    res.status(500).send('Error deleting Bloq documents.');
  }
};
