import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Worker } from 'src/app/interface/worker';
import { WorkerService } from '../services/worker.service';
import { AdduserComponent } from '../adduser/adduser.component';
import { Router } from '@angular/router';





@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id_worker', 'w_lastname', 'w_firstname', 'w_cell', 'w_email', 'w_address', 'w_bday', 'modifier', 'supprimer'];
  dataSource: MatTableDataSource<Worker>;
  loading: boolean = false;

  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _workerService: WorkerService, private _snackBar: MatSnackBar, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getallWorkers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Personnes par page";
  }

  getallWorkers() {
    this.loading = true;
    this._workerService.getWorkers().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  addEditWorker(id?: number) {
    //console.log(id);
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '650px',
      disableClose: true,
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getallWorkers();
      }
    });
  }

  deleteAWorker(id: number) {
    this.loading = true;
    this._workerService.deleteWorker(id).subscribe(() => {
      this.getallWorkers();
      this.messageSucces();
    })
  }

  messageSucces() {
    this._snackBar.open('Employé supprimé correctement', '', {
      duration: 2000
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
