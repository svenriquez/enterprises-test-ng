import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {

  formGroup = new FormGroup({
    'titulo': new FormControl('',[Validators.required]),
    'descripcion': new FormControl('', [Validators.required])
  });

  @ViewChild('formRef') formRef!: FormGroupDirective;

  constructor(
    private dialogRef: MatDialogRef<FormComponent>,
    private readonly service: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  createItem() {

  }

}
