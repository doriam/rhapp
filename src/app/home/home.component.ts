import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tokenid: string | null

  constructor(private router: Router, public dialog: MatDialog, private jwtHelper: JwtHelperService) {
    this.tokenid = this.jwtHelper.decodeToken(localStorage.getItem('token')!);
  }

  ngOnInit(): void {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('token')!);
    //console.log(token.id);
  }

  btnConnecter() {
    this.router.navigate(['/login'])
  }
  btnList() {
    this.router.navigate(['/list_users'])
  }
  btnCreer(todo: string) {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '650px',
      disableClose: true,
      data: {
        todo: todo
      }
    });
  }
}
