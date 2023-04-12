import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MessagesComponent } from '../../../../../messages/messages.component';

import { EmployeService } from '../../employe.service';

@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.scss']
})
export class CreateEmployeComponent implements OnInit {
  employeForm!: FormGroup;
  employe!: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private senderService: EmployeService,
    private dialogRef: MatDialogRef<CreateEmployeComponent>
  ) { }

  ngOnInit(): void {
    this.employeForm = this.formBuilder.group({
      name: ['cocacola'],
      form: ['sarl'],
      address: ['lorem ipsum dolor 12 36'],
      rc: ['15533669DD'],
      ice: ['15533669DD'],
      capital: ['100000'],
    });
  }
  createEmploye(){
    this.senderService.createEmploye(this.employeForm.value).subscribe(response=>{
      if(response.code){
        this.employe = response.data.messages[0];
      }
      else
        this.snackBar.openFromComponent(MessagesComponent,{data: response.data});
    });
  } 
}
