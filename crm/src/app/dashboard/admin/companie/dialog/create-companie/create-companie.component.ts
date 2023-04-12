import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MessagesComponent } from '../../../../../messages/messages.component';

import { CompanieService } from '../../companie.service';

@Component({
  selector: 'app-create-companie',
  templateUrl: './create-companie.component.html',
  styleUrls: ['./create-companie.component.scss']
})
export class CreateCompanieComponent implements OnInit {
  companieForm!: FormGroup;
  companie!: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private senderService: CompanieService,
    private dialogRef: MatDialogRef<CreateCompanieComponent>
  ) { }

  ngOnInit(): void {
    this.companieForm = this.formBuilder.group({
      name: ['cocacola'],
      form: ['sarl'],
      address: ['lorem ipsum dolor 12 36'],
      rc: ['15533669DD'],
      ice: ['15533669DD'],
      capital: ['100000'],
    });
  }
  createCompanie(){
    this.senderService.createCompanie(this.companieForm.value).subscribe(response=>{
      if(response.code)
        this.companie = response.data;
      this.snackBar.openFromComponent(MessagesComponent,{data: response});
    });
  } 
}
