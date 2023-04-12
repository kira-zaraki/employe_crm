import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { MessagesComponent } from '../../../messages/messages.component';

import { EmployeService } from './employe.service'; 

export interface EmployeData {
  id: number;
  name: string;
  email: string;
  companie: {
    name:string
  }; 
}

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'companie', 'role', 'action'];
  dataSource!: MatTableDataSource<EmployeData>;
  employes !: EmployeData[];

  @ViewChild(MatPaginator, {static: true}) paginator !: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private employeService: EmployeService,
    private snackBar: MatSnackBar,
    private routeData: ActivatedRoute,
  ) { 
    // this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.routeData.data.subscribe(({employes}) => {
      if(employes.code){
        this.employes = employes.data;
        this.dataSource = new MatTableDataSource(this.employes);
      } 
    });

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter) 
            || data.email.toLowerCase().includes(filter) 
            || data.companie.name.toString().includes(filter);
    };
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  deleteEmploye(employe: EmployeData){
    this.employeService.deleteEmploye(employe).subscribe(response=>{
      this.employes = response.data;
      this.refreshData();
    });
  }

  refreshData(){
    this.dataSource.data = this.employes;
  }

  changeRole(role:any, id:number){
    this.employeService.changeRole(role, id).subscribe(response=>{
      if(response.code){
        this.employes = response.data;
        this.refreshData();
        this.snackBar.openFromComponent(MessagesComponent,{data: response});
      }
    });
  }
}