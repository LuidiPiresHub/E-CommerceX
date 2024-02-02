import { HttpStatus } from '../utils/mapStatus';

export interface IStripeServices {
  type: keyof typeof HttpStatus;
  message: string;
}
