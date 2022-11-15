import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.processReturnURLParameter(params);
      this.processTokenURLParameter(params);
    });
    this.verifyLoggedInUser();
    this.loginForm.valueChanges.subscribe(res => {
      this.errorMessage = undefined;
    });
  }

  processReturnURLParameter(params: any) {
    const returnURL = params['returnURL'];
    console.log('returnURL = ', returnURL);
    if (!returnURL) return
    else this.userService.returnURL = returnURL;
  }

  processTokenURLParameter(params: any) {
    const token = params['token'];
    if (!token) return
    else this.router.navigateByUrl('/validateUser?token=' + token);
  }

  verifyLoggedInUser() {
    this.userService.verifyLogin().subscribe(
      res => {
        if (res === 'Valid Token') {
          this.router.navigateByUrl('/validateUser');
        }
      }
    );
  }

  submitForm() {
    if (this.loginForm.valid && this.loginForm.controls.email.value && this.loginForm.controls.password.value) {
      this.userService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe({
        next: (user: IUser[]) => {
          this.userService.loggedInUser = user[0];
          this.router.navigateByUrl('/validateUser');
        },
        error: (err) => {
          this.errorMessage = err.error;
        }
      });
    }
  }

}
