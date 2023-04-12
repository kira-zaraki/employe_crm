import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateInvitationComponent } from './dialog/create-invitation/create-invitation.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { InvitationService } from './invitation.service'; 

export interface InvitationData {
  id: number;
  email: string;
  name: string;
  status: string; 
}

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'name', 'status', 'action'];
  dataSource!: MatTableDataSource<InvitationData>;
  invitations !: InvitationData[];

  @ViewChild(MatPaginator, {static: true}) paginator !: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private companieService: InvitationService,
    private routeData: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeData.data.subscribe(({invitations}) => {
      if(invitations.code){
        this.invitations = invitations.data;
        this.dataSource = new MatTableDataSource(this.invitations);
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

  inserInvitationDialog(){
    const dialogRef = this.dialog.open(CreateInvitationComponent);
    dialogRef.afterClosed().subscribe((invitations: InvitationData[]) => {
      this.invitations = invitations;
      this.refreshData();
    });
  }

  deleteInvitation(invitation: InvitationData){
    this.companieService.deleteInvitation(invitation).subscribe(response=>{
      this.invitations = response.data;
      this.refreshData();
    });
  }

  refreshData(){
    this.dataSource.data = this.invitations;
  }

}
