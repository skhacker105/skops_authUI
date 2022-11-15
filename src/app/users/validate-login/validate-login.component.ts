import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-validate-login',
  templateUrl: './validate-login.component.html',
  styleUrls: ['./validate-login.component.scss']
})
export class ValidateLoginComponent implements OnInit {

  verificationStatus = 'Verification Pending...';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.processTokenURLParameter(params);
    });
    this.verifyLoggedInUser();
  }

  processTokenURLParameter(params:any) {
    const token = params['token'];
      if (!token) return
      this.userService.getTokenInfo(token).subscribe({
        next: (res) => {
          this.userService.loggedInUser = res;
          this.verifyLoggedInUser();
        },
        error: (err) => {
          this.verificationStatus = err.error.message;
        }
      });
  }

  verifyLoggedInUser() {
    if (!this.userService.loggedInUser) {
      this.verificationStatus = 'No User logged in';
      return;
    }
    this.userService.verifyLogin().subscribe({
      next: (res: any) => {
        this.verificationStatus = res.message;
        this.userService.returnWithToken();
      },
      error: err => {
        this.verificationStatus = err.error.message;
      }
    });
  }

}
