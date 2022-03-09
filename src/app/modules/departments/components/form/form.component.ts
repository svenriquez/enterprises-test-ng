import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { ACCIONES_ITEM } from 'src/app/config/config';
import { MessageErrorFormService } from '../../../../services/message-error-form.service';
import { validationMessagesDepartment } from 'src/app/modules/resources/department-form-validation-messages';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  object: any;
  metadatos: any;

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
      this.service.getItem(this.data.id, 'department').subscribe((data: any) => {
        this.object = data;
        this.cargarData();
      });
    }

    this.service.getMetadatos(this.data?.id, 'department').subscribe((data: any) => {
      this.metadatos = data;
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
      Description: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, ],
      Name: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) }, [ Validators.required ] ],
      Phone: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.VER.nombre ? true : false) } ],
      IdEnterprise: [{ value: null, disabled: (this.data.tipo == ACCIONES_ITEM.CREAR.nombre ? false : true) }, [ Validators.required ] ]
    });
  }

  cargarData() {
    this.formGroup.patchValue({
      CreatedBy: this.object ? this.object.CreatedBy : null,
      ModifiedBy: this.object ? this.object.ModifiedBy : null,
      Status: this.object ? this.object.Status : null,
      Description: this.object ? this.object.Description : null,
      Name: this.object ? this.object.Name : null,
      Phone: this.object ? this.object.Phone : null,
      IdEnterprise: this.object ? this.object.IdEnterprise : null
    });
  }

  createItem() {
    this.validateForm();

    if (this.formGroup.valid) {
      const objeto = {
        Id: 0,
        ...this.formGroup.value
      };

      if (this.object && this.object.Id) {
        objeto.Id = this.object.Id;
        objeto.IdEnterprise = this.object.IdEnterprise;

        this.service.putItem(objeto, "department").subscribe((data: any) => {
          if (data != undefined && data != null) {
            this.toastr.info(data.mensaje);
            this.dialogRef.close();
          }
        });
      } else {
        this.service.postItem(objeto, "department").subscribe((data: any) => {
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
      this.messageErrorFormService.show(this.formGroup.controls, validationMessagesDepartment);
      result = false;
    }

    return result;
  }

  changeToEdit() {
    this.data.tipo = ACCIONES_ITEM.EDITAR.nombre;
    this.formGroup.enable();
    this.formGroup.get("IdEnterprise")?.disable();
    this.initForm();
    this.cargarData();
    this.formGroup.get("ModifiedBy")?.setValidators([Validators.required]);
    this.formGroup.patchValue({
      ModifiedBy: null
    });
  }

}
