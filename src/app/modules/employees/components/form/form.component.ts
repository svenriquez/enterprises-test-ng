import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SIZE_MODAL, ACCIONES_ITEM } from 'src/app/config/config';
import { validationMessagesEmployee } from 'src/app/modules/resources/employee-form-validation-messages';
import { HttpService } from 'src/app/services/http.service';
import { MessageErrorFormService } from 'src/app/services/message-error-form.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  object: any;
  metadatos: any;
  departments: Array<any> = [];

  ACCIONES_ITEM = ACCIONES_ITEM;

  @ViewChild('formRef') formRef!: FormGroupDirective;
  tamDivNombre: number = 12;
  tamDivStatus: number = 0;

  constructor(
    private dialogRef: MatDialogRef<FormComponent>,
    private readonly service: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private messageErrorFormService: MessageErrorFormService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (this.data.tipo == this.ACCIONES_ITEM.CREAR.nombre) {
      this.tamDivNombre = 12;
      this.tamDivStatus = 0;
    } else {
      this.tamDivNombre = 9;
      this.tamDivStatus = 3;
    }

    if (this.data.tipo != this.ACCIONES_ITEM.CREAR.nombre && this.data.id != undefined && this.data.id != null && this.data.id > 0) {
      this.service.getItem(this.data.id, 'employee').subscribe((data: any) => {
        this.object = data;
        this.cargarData();
      });
    }

    this.service.getMetadatos(this.data?.id, 'employee').subscribe((data: any) => {
      this.metadatos = data;
      this.departments = this.metadatos?.departmentList;
    });

  }

  close() {
    this.dialogRef.close();
  }

  initForm() {
    this.formGroup = this.fb.group({
      CreatedBy: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ]],
      ModifiedBy: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) } ],
      Status: [{ value: true, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ] ],
      Age: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ] ],
      Email: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) } ],
      Name: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ] ],
      Position: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ]],
      Surname: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ] ],
      IdEnterprise: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ] ],
      IdDepartment: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ] ],
    });
  }

  cargarData() {
    this.formGroup.patchValue({
      CreatedBy: this.object ? this.object.CreatedBy : null,
      ModifiedBy: this.object ? this.object.ModifiedBy : null,
      Status: this.object ? this.object.Status : null,
      Age: this.object ? this.object.Age : null,
      Email: this.object ? this.object.Email : null,
      Position: this.object ? this.object.Position : null,
      Name: this.object ? this.object.Name : null,
      Surname: this.object ? this.object.Surname : null,
      IdEnterprise: this.object ? this.object.IdEnterprise : null,
      IdDepartment: this.object ? this.object.IdDepartment : null
    });
  }

  createItem() {
    this.validateForm();

    if (this.formGroup.valid) {
      const objeto = {
        Id: 0,
        DepartmentsEmployees: [
          {
            IdDepartment: this.formGroup.value.IdDepartment
          }
        ],
        ...this.formGroup.value
      };

      if (this.object && this.object.Id) {
        objeto.Id = this.object.Id;
        this.service.putItem(objeto, "employee").subscribe((data: any) => {
          if (data != undefined && data != null) {
            this.toastr.info(data.mensaje);
            this.dialogRef.close();
          }
        });
      } else {
        this.service.postItem(objeto, "employee").subscribe((data: any) => {
          if (data != undefined && data != null) {
            this.toastr.info(data.mensaje);
            this.dialogRef.close();
          }
        });
      }
    }
  }

  validateForm() {
    let result = true;
    if (!this.formGroup.valid) {
      this.messageErrorFormService.show(this.formGroup.controls, validationMessagesEmployee);
      result = false;
    }

    return result;
  }

  changeToEdit() {
    this.data.tipo = ACCIONES_ITEM.EDITAR.nombre;
    this.formGroup.enable();
    this.initForm();
    this.cargarData();
    this.formGroup.get("ModifiedBy")?.setValidators([Validators.required]);
    this.formGroup.patchValue({
      ModifiedBy: null
    });
  }

  getDepartments() {
    this.service.getDepartmentsByIdEnterprise(this.formGroup.value.IdEnterprise, "department").subscribe((data: any) => {
      if (data != undefined && data != null) {
        this.departments = data;
      }
    });
  }

}
