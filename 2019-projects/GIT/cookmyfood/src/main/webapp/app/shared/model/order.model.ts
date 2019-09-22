import { Moment } from 'moment';
import { IVendor } from 'app/shared/model/vendor.model';
import { IMenu } from 'app/shared/model/menu.model';

export const enum Status {
  COMPLETED = 'COMPLETED',
  INPROGRESS = 'INPROGRESS',
  READYTOSERVE = 'READYTOSERVE'
}

export interface IOrder {
  id?: number;
  employeeid?: string;
  phone?: string;
  date?: Moment;
  cost?: number;
  status?: Status;
  vendor?: IVendor;
  menu?: IMenu;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public employeeid?: string,
    public phone?: string,
    public date?: Moment,
    public cost?: number,
    public status?: Status,
    public vendor?: IVendor,
    public menu?: IMenu
  ) {}
}
