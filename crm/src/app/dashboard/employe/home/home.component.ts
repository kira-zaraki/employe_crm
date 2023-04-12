import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { EmployeService } from '../employe.service'; 

import { MessagesComponent } from '../../../messages/messages.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  employe :any = [];
  employeForm!: FormGroup;
  constructor(
    private employeService: EmployeService,
    private routeData: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.routeData.data.subscribe(({user}) => {
      if(user.code){
        this.employe = user.data;
        this.employeForm = this.formBuilder.group({
          user: this.formBuilder.group({
            name: [this.employe.user.name],
            email: [this.employe.user.email],
          }),
          profile: this.formBuilder.group({
            name: [this.employe.profile.name],
            address: [this.employe.profile.address],
            phone: [this.employe.profile.phone],
          })
        });
      } 
    });
  }

  updateEmploye(){
    this.employeService.updateEmploye(this.employeForm.value).subscribe(response=>{
      if(response.code)
        this.employe = response.data;
      this.snackBar.openFromComponent(MessagesComponent,{ data: response })
    });
  }
}
