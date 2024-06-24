import { LockerStatus } from './LockerStatus';

export type Locker = {
  id: string;
  bloqId: string;
  status: LockerStatus;
  isOccupied: boolean;
};
