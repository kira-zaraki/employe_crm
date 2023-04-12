import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MessagesComponent } from '../../../../../messages/messages.component';

import { InvitationService } from '../../invitation.service';
import { CompanieService } from '../../../companie/companie.service';

@Component({
  selector: 'app-create-invitation',
  templateUrl: './create-invitation.component.html',
  styleUrls: ['./create-invitation.component.scss']
})
export class CreateInvitationComponent implements OnInit {
  invitationForm!: FormGroup;
  invitation!: any;
  companies!: any;
  send:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private invitationService: InvitationService,
    private companieService: CompanieService,
    private dialogRef: MatDialogRef<CreateInvitationComponent>
  ) { }

  ngOnInit(): void {
    this.invitationForm = this.formBuilder.group({
      name: ['cocacola'],
      email: ['lorem@gmail.com'],
      companie: [57], 
      status: ['sent'], 
    });

    this.companieService.getCompanies().subscribe(response=>{
      if(response.code)
        this.companies = response.data;
    });
  }

  createInvitation(){
    this.invitationService.createInvitation(this.invitationForm.value).subscribe(response=>{
      if(response.code)
        this.invitation = response.data;
      this.snackBar.openFromComponent(MessagesComponent,{data: response});
    });
  }

  activeSend(e: any){
    this.invitationForm.get('status')?.setValue((e.target.checked)? 'sent' : 'pause');
  }

}
