import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  registrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  hide = true;

  constructor( private http: HttpClient) { }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registrationForm.value);
    this.registerNewUser(this.registrationForm.value).subscribe({
       next (response: any) {
        console.log(response);
          if(response.username != undefined){
            // this.router.navigate(['user/login'])
            console.log("user undefined")
          }
        },
      error (err: HttpErrorResponse) {
        alert(err.message);
      }
    });
  }

  public registerNewUser(userRegister:any): Observable<any> {
    const httpOptions = {
 	 	headers: new HttpHeaders(
    //   // {'Content-Type': 'application/json',
    //   // 'Access-Control-Allow-Origin': '*'}
      )
	  }
    httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Content-Type');
    httpOptions.headers.append('Access-Control-Max-Age', '86400');
    httpOptions.headers.append('Content-Type', 'application/json');
    httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
     
     return this.http.post<any>(`http://localhost:8080/user/register`, userRegister, httpOptions);
  }
}
