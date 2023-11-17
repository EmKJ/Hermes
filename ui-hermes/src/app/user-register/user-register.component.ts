import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControlOptions, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { MustMatch } from '../_helper/must-match.validator';

@Component({
  // providers: [{provide: MatFormFieldModule}],
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {

  registrationForm!:FormGroup;

  hide = true;
  
  constructor(  
    private router: Router,
    private userService: UserService,
    ) {}
  
  get name() { return this.registrationForm.get('username'); }
  
  ngOnInit(): void { 
    this.registrationForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z\\d]*'),Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[\\d])(?=.*[A-Z])[a-zA-Z\\d\\S]*'), Validators.minLength(6)]),
      verifyPassword: new FormControl('', Validators.required)
    }, {
      validators: [MustMatch('password', 'verifyPassword')]
    }
    );
  }

  getErrorMessage(controlName:string) {
    if (controlName === "username"){
      let controlValue = this.registrationForm.get('username');
      return controlValue?.value?.includes(" ")? 'Space is not a valid character':
        controlValue?.hasError('minlength')? 'Must be 5 chars long':
        controlValue?.hasError('pattern')? 'Please use only alphanumeric characters':"username error"; 
    }
  
    if (controlName === "password"){
      let controlValue = this.registrationForm.get('password');
      return controlValue?.value?.includes(" ")? 'Space is not a valid character':
        controlValue?.hasError('minlength')? 'Must be 6 chars long':
        controlValue?.hasError('pattern')? 'Must contain an uppercase and a number':"password error"; 
    }

    if (controlName === "verifyPassword"){
      let controlValue = this.registrationForm.get('verifyPassword');
      return (controlValue?.value !== this.registrationForm.get('password')?.value) ? 'Passwords don\'t match':"password error"; 
    }

    return "";
  }
  
  onSubmit():void {
    console.log(this.registrationForm.value);
     if (this.registrationForm.invalid) {
      return;
     }  
    this.userService.registerNewUser(this.registrationForm.value).subscribe({
       next: (response) => {
        console.log(response);
          this.router.navigate(['user/login']);
        },
      error (err: HttpErrorResponse) {
        alert(err.message);
      }
    });
  }
}
