import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Worker } from 'src/app/interface/worker';
import { WorkerService } from '../services/worker.service';
import { AdduserComponent } from '../adduser/adduser.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id_worker', 'w_firstname', 'w_lastname', 'w_cell', 'w_email', 'w_address', 'w_bday', 'modifier', 'supprimer'];
  dataSource: MatTableDataSource<Worker>;
  loading: boolean = false;

  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource2 = ELEMENT_DATA;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _workerService: WorkerService, private _snackBar: MatSnackBar) {
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



}
