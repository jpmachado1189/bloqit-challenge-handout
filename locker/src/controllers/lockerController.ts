import { Request, Response } from 'express';
import LockerModel from '../models/LockerModel';
import { LockerStatus } from '../types/LockerStatus';

// Get Lockers by Bloq ID
export const findAvailableByBloqId = async (req: Request, res: Response) => {
  try {
    const bloqId = req.params.bloqId;

    if (!bloqId) {
      throw new Error('No Bloq ID provided.');
    }

    const locker = await LockerModel.findOne({
      bloqId: bloqId,
      status: LockerStatus.CLOSED,
      isOccupied: false,
    });

    if (!locker) {
      throw new Error('There are no available lockers.');
    }

    res.status(200).send(locker);
  } catch (error) {
    res.status(500).send('There are no available lockers.');
  }
};

// Allocate Locker
export const allocateLockerById = async (req: Request, res: Response) => {
  try {
    const lockerId = req.params.lockerId;

    if (!lockerId) {
      throw new Error('No Locker ID provided.');
    }

    const locker = await LockerModel.findOneAndUpdate(
      { id: lockerId },
      { isOccupied: true },
      { new: true }
    );

    if (!locker) {
      throw new Error('No Locker found with provided ID.');
    }

    res.status(200).send(locker);
  } catch (error) {
    res.status(500).send('Error allocating locker by id');
  }
};

// Free Locker
export const freeLockerById = async (req: Request, res: Response) => {
  try {
    const lockerId = req.params.lockerId;

    if (!lockerId) {
      throw new Error('No Locker ID provided.');
    }

    const locker = await LockerModel.findOneAndUpdate(
      { id: lockerId },
      { isOccupied: false },
      { new: true }
    );

    if (!locker) {
      throw new Error('No Locker found with provided ID.');
    }

    res.status(200).send(locker);
  } catch (error) {
    res.status(500).send('Error freeing locker by id');
  }
};

// Attempt Dropoff
export const dropoff = async (req: Request, res: Response) => {
  try {
    const lockerId = req.params.lockerId;

    if (!lockerId) {
      throw new Error('No Locker ID provided.');
    }

    const locker = await LockerModel.findOne({ id: lockerId });

    if (!locker) {
      throw new Error('Error finding locke with provided ID.');
    }

    // MOCK Estabilish connection to IoT device to react to dropoff
    await LockerModel.findOneAndUpdate(
      { id: lockerId },
      { status: LockerStatus.OPEN }
    );
    // MOCK Set a timer to close and cancel the operation
    await LockerModel.findOneAndUpdate(
      { id: lockerId },
      { status: LockerStatus.CLOSED }
    );
    // MOCK Current code will always assume dropoff success by the customer
    res.status(200).send(locker);
  } catch (error) {
    res.status(500).send('Error on Locker dropoff.');
  }
};

// Attempt Pick Up
export const pickup = async (req: Request, res: Response) => {
  try {
    const lockerId = req.params.lockerId;

    if (!lockerId) {
      throw new Error('No Locker ID provided.');
    }

    const locker = await LockerModel.findOne({ id: lockerId });

    if (!locker) {
      throw new Error('Error finding locker with provided ID.');
    }

    // MOCK Estabilish connection to IoT device to react to pickup
    await LockerModel.findOneAndUpdate(
      { id: lockerId },
      { status: LockerStatus.OPEN }
    );
    // MOCK Set a timer to close and cancel the operation on set timeout
    await LockerModel.findOneAndUpdate(
      { id: lockerId },
      { status: LockerStatus.CLOSED }
    );
    // MOCK Current code will always assume dropoff success by the customer
    res.status(200).send(locker);
  } catch (error) {
    res.status(500).send('Error on Locker pick up.');
  }
};

// Find All
export const findAll = async (req: Request, res: Response) => {
  try {
    const lockers = await LockerModel.find({});
    res.status(200).send(lockers);
  } catch (error) {
    res.status(500).send('Error finding all Lockers');
  }
};

// Bulk Save
export const bulkSave = async (req: Request, res: Response) => {
  try {
    const mockData = req.body;
    const createdLockers = await LockerModel.insertMany(mockData);

    res.status(201).send(createdLockers);
  } catch (error) {
    res.status(500).send('Error bulk saving Lockers');
  }
};

// Delete all
export const deleteAll = async (req: Request, res: Response) => {
  try {
    await LockerModel.deleteMany({});

    res.status(200).send('Every Locker deleted.');
  } catch (error) {
    res.status(500).send('Error deleting Locker documents.');
  }
};
