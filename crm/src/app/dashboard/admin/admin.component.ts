import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin:any = [];
  constructor(
    private routeData: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeData.data.subscribe(({user}) => {
      if(user.code)
        this.admin = user.data;
    });
  }

}
