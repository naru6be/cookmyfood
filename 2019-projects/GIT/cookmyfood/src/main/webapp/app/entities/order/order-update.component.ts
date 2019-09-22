import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrder, Order } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { IVendor } from 'app/shared/model/vendor.model';
import { VendorService } from 'app/entities/vendor';
import { IMenu } from 'app/shared/model/menu.model';
import { MenuService } from 'app/entities/menu';

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
  isSaving: boolean;

  vendors: IVendor[];

  menus: IMenu[];

  editForm = this.fb.group({
    id: [],
    employeeid: [null, [Validators.required]],
    phone: [],
    date: [],
    cost: [],
    status: [],
    vendor: [],
    menu: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderService: OrderService,
    protected vendorService: VendorService,
    protected menuService: MenuService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ order }) => {
      this.updateForm(order);
    });
    this.vendorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVendor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVendor[]>) => response.body)
      )
      .subscribe((res: IVendor[]) => (this.vendors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.menuService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMenu[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMenu[]>) => response.body)
      )
      .subscribe((res: IMenu[]) => (this.menus = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(order: IOrder) {
    this.editForm.patchValue({
      id: order.id,
      employeeid: order.employeeid,
      phone: order.phone,
      date: order.date != null ? order.date.format(DATE_TIME_FORMAT) : null,
      cost: order.cost,
      status: order.status,
      vendor: order.vendor,
      menu: order.menu
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id']).value,
      employeeid: this.editForm.get(['employeeid']).value,
      phone: this.editForm.get(['phone']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      cost: this.editForm.get(['cost']).value,
      status: this.editForm.get(['status']).value,
      vendor: this.editForm.get(['vendor']).value,
      menu: this.editForm.get(['menu']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackVendorById(index: number, item: IVendor) {
    return item.id;
  }

  trackMenuById(index: number, item: IMenu) {
    return item.id;
  }
}
