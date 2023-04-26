import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { formatDate } from '@angular/common';

import { MessagesComponent } from '../../../messages/messages.component';

import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  employeForm!: FormGroup;
  employe:any;
  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private routeData: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.routeData.data.subscribe(({employe}) => {
      if(employe.code){
        this.employe = employe.data;
        if(this.employe.status == 'validated')
          this.router.navigate(['/sign-in']);
        this.employeForm = this.formBuilder.group({
          user: this.formBuilder.group({
            email: [this.employe.email],
            name: [this.employe.name],
            password: ['123456'],
            companie: [this.employe.companie],
          }),
          profile: this.formBuilder.group({
            address: ['lorem ipsum'],
            phone: ['0600000000'],
            name: [this.employe.name],
            birthday: [],
          })
        });
      } 
    }); 
  }

  saveEmploye(){
    this.signUpService.signUp(this.employeForm.value, this.employe.id).subscribe(response=>{
      if(response.code)
        this.router.navigate(['/sign-in']);
      else
        this.snackBar.openFromComponent(MessagesComponent,{data: response});
    });
  }

}
