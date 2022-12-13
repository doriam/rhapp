import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Worker } from '../interface/worker';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/workers/';
  }

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteWorker(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  addWorker(worker: Worker): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, worker);
  }

  getWorker(id: number): Observable<Worker> {
    return this.http.get<Worker>(this.myAppUrl + this.myApiUrl + id);
  }

  updateWorker(id: number, worker: Worker): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, worker);
  }
}
