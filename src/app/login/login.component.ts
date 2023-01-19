import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //public user = { email: '', password: '' };

  username: string = "";
  password_u: string = "";

  constructor(private router: Router, public dialog: MatDialog, private _userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {
    //Validation d'information
    if (this.username == '' || this.password_u == '') {
      alert("Veuillez remplir les champs obligatoires")
      return
    }

    //Création de l'objet à envoyer avec l'information saisie
    const user: User = {
      u_name: this.username,
      u_password: this.password_u
    }

    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token)
        this.router.navigate(['/profil'])
      },
      error: (e: HttpErrorResponse) => {
        this.messageError(e);
      }
    })
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Veuillez saisir votre email';
    }

    return this.email.hasError('email') ? 'Email invalid' : '';
  }
  hide = true;


  addWorkerAndUser(todo: string) {
    //console.log(id);
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '650px',
      disableClose: true,
      data: {
        todo: todo
      }
    });
  }

  //Message affiché selon l'action faite avec le formulaire
  messageError(e: HttpErrorResponse) {
    this._snackBar.open(`Email ou mot de passe incorrect. Réessayez.`, '', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['warning']
    })
  }
}
