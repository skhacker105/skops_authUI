import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<IUser> {
    const param = {
      email: email,
      pass: password
    };
    const url = environment.uersapi + '/login';
    return this.http.post<IUser>(url, param)
  }
}
