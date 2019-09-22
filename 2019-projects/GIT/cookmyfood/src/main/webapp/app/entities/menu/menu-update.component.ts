import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMenu, Menu } from 'app/shared/model/menu.model';
import { MenuService } from './menu.service';

@Component({
  selector: 'jhi-menu-update',
  templateUrl: './menu-update.component.html'
})
export class MenuUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    foodname: [],
    cost: []
  });

  constructor(protected menuService: MenuService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ menu }) => {
      this.updateForm(menu);
    });
  }

  updateForm(menu: IMenu) {
    this.editForm.patchValue({
      id: menu.id,
      foodname: menu.foodname,
      cost: menu.cost
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const menu = this.createFromForm();
    if (menu.id !== undefined) {
      this.subscribeToSaveResponse(this.menuService.update(menu));
    } else {
      this.subscribeToSaveResponse(this.menuService.create(menu));
    }
  }

  private createFromForm(): IMenu {
    return {
      ...new Menu(),
      id: this.editForm.get(['id']).value,
      foodname: this.editForm.get(['foodname']).value,
      cost: this.editForm.get(['cost']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenu>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
