import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data!:any;
  constructor(private routeData: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeData.data.subscribe(({mainData}) => {
      if(mainData.code)
        this.data = mainData.data;
    });
  }

}
