import { IOrder } from 'app/shared/model/order.model';
import { IMenu } from 'app/shared/model/menu.model';

export interface IVendor {
  id?: number;
  name?: string;
  orders?: IOrder[];
  menu?: IMenu;
}

export class Vendor implements IVendor {
  constructor(public id?: number, public name?: string, public orders?: IOrder[], public menu?: IMenu) {}
}
