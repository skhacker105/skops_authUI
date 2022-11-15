import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string | undefined;
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  });

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.loginForm.valid && this.loginForm.controls.email.value && this.loginForm.controls.password.value) {
      console.log('loginForm = ', this.loginForm.value);
      this.userService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((user: IUser) => {
        console.log('user = ', user);
      },
        err => {
          this.errorMessage = err.error;
        });
    }
  }

  public myError = (controlName: string, errorName: string): boolean => {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }

}
