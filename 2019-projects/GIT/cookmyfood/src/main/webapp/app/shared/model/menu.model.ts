import { IOrder } from 'app/shared/model/order.model';
import { IVendor } from 'app/shared/model/vendor.model';

export interface IMenu {
  id?: number;
  foodname?: string;
  cost?: number;
  orders?: IOrder[];
  vendors?: IVendor[];
}

export class Menu implements IMenu {
  constructor(public id?: number, public foodname?: string, public cost?: number, public orders?: IOrder[], public vendors?: IVendor[]) {}
}
