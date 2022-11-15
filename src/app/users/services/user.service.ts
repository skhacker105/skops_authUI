import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser: IUser | undefined;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<IUser[]> {
    const param = {
      email: email,
      pass: password
    };
    const url = environment.uersapi + '/login';
    return this.http.post<IUser[]>(url, param)
  }

  verifyLogin(): Observable<string> {
    const url = environment.uersapi + '/validatetoken';
    return this.http.get<string>(url);
  }

  getTokenInfo(token: string): Observable<IUser> {
    const url = environment.uersapi + '/info?token=' + token;
    return this.http.get<IUser>(url);
  }
}
