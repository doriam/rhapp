import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StringDataType } from 'sequelize';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  id_worker!: number
  w_firstname!: string
  w_lastname!: string
  w_adress!: string
  w_cell!: string
  w_email!: string
  w_bday!: Date
  constructor(private router: Router, private jwtHelper: JwtHelperService, private _workerService: WorkerService,) {

  }

  ngOnInit(): void {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('token')!)
    this.getUser(token.id);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  getUser(id: number) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('token')!);
    console.log(token.id);

    this._workerService.getWorker(token.id).subscribe(data => {
      console.log(data);
      this.id_worker = data.id_worker
      this.w_firstname = data.w_firstname
      this.w_lastname = data.w_lastname
      this.w_adress = data.w_address
      this.w_cell = data.w_cell
      this.w_email = data.w_email
      this.w_bday = data.w_bday
    })
  }
}
