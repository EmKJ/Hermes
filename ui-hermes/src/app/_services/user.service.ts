import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    ) { }

  public registerNewUser(userRegister:User): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/user/register`, userRegister);
 }
}
