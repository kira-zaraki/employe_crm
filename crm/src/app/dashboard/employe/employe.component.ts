import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmployeService } from './employe.service'; 


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  colleagues!:any[];
  employe:any = [];

  constructor(
    private employeService: EmployeService,
    private routeData: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeData.data.subscribe(({user}) => {
      if(user.code){
        this.colleagues = user.data.colleagues;
        this.employe = user.data.user;
      }
    });
  }

}
