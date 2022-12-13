import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Worker } from '../interface/worker';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  action: string = 'Ajouter ';
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<AdduserComponent>, private fb: FormBuilder, private _workerService: WorkerService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      id_worker: ['', [Validators.required, Validators.maxLength(7), Validators.pattern("^[0-9]*$")]],
      w_firstname: ['', [Validators.required, Validators.maxLength(20)]],
      w_lastname: ['', [Validators.required, Validators.maxLength(20)]],
      w_address: ['', [Validators.required, Validators.maxLength(50)]],
      w_cell: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      w_email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      w_bday: ['', [Validators.required, Validators.maxLength(10)]],
    })
    this.id = data.id;
  }

  ngOnInit(): void {
    this.addOrEdit(this.id);
  }

  addOrEdit(id: number | undefined) {
    if (id !== undefined) {
      this.action = 'Modifier ';
      this.getWorker(id);
    }
  }

  getWorker(id: number) {
    this._workerService.getWorker(id).subscribe(data => {
      this.form.setValue({
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

    this.loading = true;

    if (this.id == undefined) {
      //ajouter
      this._workerService.addWorker(worker).subscribe(() => {

        this.messageSucces('ajouté');
      });
    }
    else {
      //Modifier
      this._workerService.updateWorker(this.id, worker).subscribe(() => {
        this.messageSucces('modifié');
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

  //à changer
  messageSucces(action: string) {
    this._snackBar.open(`Employé ${action} correctement`, '', {
      duration: 2000
    })
  }
}
