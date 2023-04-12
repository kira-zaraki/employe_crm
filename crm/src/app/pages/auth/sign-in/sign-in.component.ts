import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SignInService } from './sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup
  constructor(
              private formBuilder: FormBuilder,
              private signInService: SignInService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      'email': ['admin@gmail.com'],
      'password': ['123456']
    });
  }

  signIn(){
    this.signInService.signIn(this.signInForm.value).subscribe(response=>{
      if(response.code){
        let user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate([user.role]);
      }
    });
  }

}
