import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SignOutService } from './sign-out.service'; 

@Component({
  selector: 'sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  @Input() name:string = '';


  constructor(
    private signOutService: SignOutService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  signOut(){
    this.signOutService.signOut().subscribe(response => {
      if(response.code){
        localStorage.clear();
        this.router.navigate(['sign-in']);
      }
    });
  }
}
