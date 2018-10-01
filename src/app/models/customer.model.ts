import { Name } from './name.model'

export class Customer {
  customerID: number;
  name: Name;
  birthday: Date;
  gender: string;
  lastContact: Date;
  customerLifetimeValue: number;
}
