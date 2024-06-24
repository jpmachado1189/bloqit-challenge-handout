import { Request, Response } from 'express';
import RentModel from '../models/RentModel';
import axios from 'axios';
import { RentStatus } from '../types/RentStatus';

// Create Rent
export const create = async (req: Request, res: Response) => {
  const address = req.params.address;

  try {
    // Save rent
    const rentData = req.body;
    const newRent = new RentModel(rentData);
    const { id: rentId } = await newRent.save();

    // Ask Bloq Service to provide closest bloq
    const { data: bloqId } = await axios.get(
      `http://bloq-service:3000/findClosest/${address}`
    );

    if (!bloqId) {
      throw new Error('Error finding Bloq.');
    }

    // Ask Locker Service to find empty locker by Bloq id
    const lockerResponse = await axios.get(
      `http://locker-service:3001/findAvailableByBloqId/${bloqId}`
    );

    if (lockerResponse.status !== 200) {
      throw new Error('There are no available lockers.');
    }

    const lockerId = lockerResponse.data.id;

    // Change Locker to occupied
    const response = await axios.patch(
      `http://locker-service:3001/allocateLockerById/${lockerId}`
    );

    if (response.status !== 200) {
      throw new Error('Error allocating locker.');
    }

    // Update rent with locker id and change status
    const updatedRent = await RentModel.findOneAndUpdate(
      { id: rentId },
      { lockerId, status: RentStatus.WAITING_DROPOFF },
      { new: true }
    );

    // MOCK Notify user + sync data with tracking service

    // Send back new rent
    res.status(201).send(updatedRent);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Find All
export const findAll = async (req: Request, res: Response) => {
  try {
    const rents = await RentModel.find({});
    res.status(200).send(rents);
  } catch (error) {
    res.status(500).send('Error finding all Rents');
  }
};

// Drop off
export const dropoff = async (req: Request, res: Response) => {
  try {
    const { rentId } = req.body;

    // Get the rent
    const rent = await RentModel.findOne({ id: rentId });
    const lockerId = rent?.lockerId;

    if (!rent || !lockerId || rent.status !== RentStatus.WAITING_DROPOFF) {
      throw new Error('Error dropping off rent.');
    }

    // Open locker for dropoff
    const { status } = await axios.get(
      `http://locker-service:3001/dropoff/${lockerId}`
    );

    if (status !== 200) {
      throw new Error('Error dropping off rent.');
    }

    const updatedRent = await RentModel.findOneAndUpdate(
      { id: rentId },
      { status: RentStatus.WAITING_PICKUP, droppedOffdAt: Date.now() },
      { new: true }
    );

    res.status(200).send(updatedRent);
  } catch (error) {
    res.status(500).send('Error dropping off rent.');
  }
};

// Pick up
export const pickup = async (req: Request, res: Response) => {
  try {
    const { rentId } = req.body;

    // Get the rent
    const rent = await RentModel.findOne({ id: rentId });
    const lockerId = rent?.lockerId;

    if (!rent || !lockerId || rent.status !== RentStatus.WAITING_PICKUP) {
      throw new Error('Error picking up rent.');
    }

    // Open locker for picking up
    const { status } = await axios.get(
      `http://locker-service:3001/pickup/${lockerId}`
    );

    if (status !== 200) {
      throw new Error('Error picking up rent.');
    }

    const updatedRent = await RentModel.findOneAndUpdate(
      { id: rentId },
      { status: RentStatus.DELIVERED, pickedUpAt: Date.now() },
      { new: true }
    );

    res.status(200).send(updatedRent);
  } catch (error) {
    res.status(500).send('Error dropping off rent.');
  }
};

// Bulk Save
export const bulkSave = async (req: Request, res: Response) => {
  try {
    const mockData = req.body;
    const createdRents = await RentModel.insertMany(mockData);

    res.status(201).send(createdRents);
  } catch (error) {
    res.status(500).send('Error bulk saving rents');
  }
};

// Delete all
export const deleteAll = async (req: Request, res: Response) => {
  try {
    await RentModel.deleteMany({});

    res.status(200).send('Every Rent deleted.');
  } catch (error) {
    res.status(500).send('Error deleting Rent documents.');
  }
};
