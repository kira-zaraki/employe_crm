import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { CompanieService } from './companie.service'; 

import { MessagesComponent } from '../../../messages/messages.component';
import { CreateCompanieComponent } from './dialog/create-companie/create-companie.component';

export interface CompanieData {
  id: number;
  name: string;
  form: string;
  address: string;
  rc: string;
  ice: string;
  capital: number;
}

@Component({
  selector: 'app-companie',
  templateUrl: './companie.component.html',
  styleUrls: ['./companie.component.scss']
})
export class CompanieComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'form', 'address', 'rc', 'ice', 'capital', 'action'];
  dataSource!: MatTableDataSource<CompanieData>;
  companies !: CompanieData[];

  @ViewChild(MatPaginator, {static: true}) paginator !: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private companieService: CompanieService,
    private routeData: ActivatedRoute,
  ) { 
  }

  ngOnInit(): void {
    this.routeData.data.subscribe(({companies}) => {
      if(companies.code){
        this.companies = companies.data;
        this.dataSource = new MatTableDataSource(this.companies);
      } 
    });
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

  inserCompanieDialog(){
    const dialogRef = this.dialog.open(CreateCompanieComponent);
    dialogRef.afterClosed().subscribe((companies: CompanieData[]) => {
      this.companies = companies;
      this.refreshData();
    });
  }

  deleteCompanie(companie: CompanieData){
    this.companieService.deleteCompanie(companie).subscribe(response=>{
      if(response.code){
        this.companies = response.data;
        this.refreshData();
      }
      else
        this.snackBar.openFromComponent(MessagesComponent,{data: response});
    });
  }

  refreshData(){
    this.dataSource.data = this.companies;
  }
}