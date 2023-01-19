import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn, ControlContainer } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Worker } from '../interface/worker';
import { User } from '../interface/user';
import { WorkerService } from '../services/worker.service';
import { UserService } from '../services/user.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  action: string = 'Enregistrer ';
  id: number | undefined;
  todo: string;
  constructor(public dialogRef: MatDialogRef<AdduserComponent>, private router: Router, private fb: FormBuilder, private _workerService: WorkerService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private _userService: UserService) {
    this.maxDate = new Date();

    this.id = data.id;
    this.todo = data.todo;
    this.form = this.fb.group({
      id_worker: [''],
      w_firstname: [''],
      w_lastname: [''],
      w_address: [''],
      w_cell: [''],
      w_email: [''],
      w_bday: [''],
      u_email: [''],
      u_password: ['']
    })


  }


  ngOnInit(): void {
    this.addOrEdit(this.id);
    //console.log(this.todo);
    if (this.todo == undefined) {
      this.form.controls['u_email'].clearValidators();
      this.form.controls['u_password'].clearValidators();
    }
    this.disablebutton()
  }

  addOrEdit(id: number | undefined) {
    if (id !== undefined) {
      this.action = 'Modifier ';
      this.getWorker(id);
    }
  }

  getWorker(id: number) {

    this._workerService.getWorker(id).subscribe(data => {
      this.form.patchValue({
        id_worker: data.id_worker,
        w_firstname: data.w_firstname,
        w_lastname: data.w_lastname,
        w_address: data.w_address,
        w_cell: data.w_cell,
        w_email: data.w_email,
        w_bday: new Date(data.w_bday)
      })
    })
  }

  cancel() {
    this.dialogRef.close(false);
  }

  addEditWorker() {
    if (this.form.invalid) {
      return;
    }
    const worker: Worker = {
      id_worker: this.form.value.id_worker,
      w_firstname: this.form.value.w_firstname,
      w_lastname: this.form.value.w_lastname,
      w_address: this.form.value.w_address,
      w_cell: this.form.value.w_cell,
      w_email: this.form.value.w_email,
      w_bday: this.form.value.w_bday.toISOString().slice(0, 10),
    }

    const user: User = {
      id_user: 0,
      id_worker: this.form.value.id_worker,
      u_name: this.form.value.u_email,
      u_password: Md5.init(this.form.value.u_password),
      u_state: "actif",
      u_last_connection: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
    this.loading = true;
    //Ajouter l'employé et créer son profil
    if (this.todo == "newWAndU") {
      this._workerService.addWorker(worker).subscribe(() => {
        this.messageSucces('ajouté');
      })
      this._userService.addUser(user).subscribe((err) => {
        this.messageSucces(' - Profil crée');
      })
      this.router.navigate(['/login'])
    }
    else if (this.id == undefined) {
      //Ajouter un employé
      this._workerService.addWorker(worker).subscribe(() => {
        this.messageSucces('enregistré');
      });
    }
    else {
      //Modifier l'information de l'employé
      this._workerService.updateWorker(this.id, worker).subscribe(() => {
        this.messageSucces('modifié');
      })
    }

    this.loading = false;
    this.dialogRef.close(true);
  }

  //Message affiché selon l'action faite avec le formulaire
  messageSucces(action: string) {
    this._snackBar.open(`Employé ${action} correctement`, '', {
      duration: 2000
    })
  }

  //Dependence du button hide pour le mdp
  hide = true;

  disablebutton() {
    const span = document.getElementById('span_confirmEmail');
    const btn = document.getElementById('mainButton');

    //mainButton
    if (span?.style.display == "block") {
      btn?.setAttribute("disabled", "disabled")
    }
    else {
      btn?.removeAttribute("disabled");
    }

  }

}
