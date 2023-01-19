import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';
import { Worker } from '../interface/worker';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/';
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(this.myAppUrl + this.myApiUrl + 'login', user)
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, user);
  }

}
