import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  // providers: [{provide: MatFormFieldModule}],
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[\\d])(?=.*[A-Z])[a-zA-Z\\d\\S]*'), Validators.minLength(6)]),
  }); 

  hide = true;
  
  constructor( private http: HttpClient) { }
  
  get name() { return this.registrationForm.get('username'); }
  
  ngOnInit(): void { }

  getErrorMessage(controlName:string) {
    if (controlName === "username"){
      return this.registrationForm.get('username')?.hasError('required')? 'You must enter a value':
      this.registrationForm.get('username')?.hasError('minlength')? 'Must be 5 chars long':"username error"; 
    }
  
    if (controlName === "password"){
      return this.registrationForm.get('password')?.hasError('minlength')? 'Must be 6 chars long':
      this.registrationForm.get('password')?.hasError('pattern')? 'Must contain an uppercase and a number':"password error"; 
    }

    return "";
  
}
  
  
  onSubmit():void {
    // TODO: Use EventEmitter with form value
    console.warn(this.registrationForm.value);
     if (this.registrationForm.invalid) {
      return;
     }  
    this.registerNewUser(this.registrationForm.value).subscribe({
       next (response: Observable<String>) {
        // console.log(response);
          // if(response.username != undefined){
            // this.router.navigate(['user/login'])
            console.log("user undefined")
            console.log(response)
          // }
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
