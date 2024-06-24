import { RentStatus } from './RentStatus';
import { RentSize } from './RentSize';

export type Rent = {
  id: string;
  lockerId: string | null;
  weight: number;
  size: RentSize;
  status: RentStatus;
};
