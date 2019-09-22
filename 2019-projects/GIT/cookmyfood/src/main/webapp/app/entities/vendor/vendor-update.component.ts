import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVendor, Vendor } from 'app/shared/model/vendor.model';
import { VendorService } from './vendor.service';
import { IMenu } from 'app/shared/model/menu.model';
import { MenuService } from 'app/entities/menu';

@Component({
  selector: 'jhi-vendor-update',
  templateUrl: './vendor-update.component.html'
})
export class VendorUpdateComponent implements OnInit {
  isSaving: boolean;

  menus: IMenu[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    menu: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected vendorService: VendorService,
    protected menuService: MenuService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vendor }) => {
      this.updateForm(vendor);
    });
    this.menuService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMenu[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMenu[]>) => response.body)
      )
      .subscribe((res: IMenu[]) => (this.menus = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(vendor: IVendor) {
    this.editForm.patchValue({
      id: vendor.id,
      name: vendor.name,
      menu: vendor.menu
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vendor = this.createFromForm();
    if (vendor.id !== undefined) {
      this.subscribeToSaveResponse(this.vendorService.update(vendor));
    } else {
      this.subscribeToSaveResponse(this.vendorService.create(vendor));
    }
  }

  private createFromForm(): IVendor {
    return {
      ...new Vendor(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      menu: this.editForm.get(['menu']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVendor>>) {
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

  trackMenuById(index: number, item: IMenu) {
    return item.id;
  }
}
