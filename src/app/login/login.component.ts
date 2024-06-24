import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { User } from 'src/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreatepostComponent } from '../createpost/createpost.component';

import { NgZone } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: User = new User();


  constructor(private formmm: FormBuilder, private router: Router, private userservice: UserserviceService, private spinnerService: NgxSpinnerService, private _snackBar: MatSnackBar, private dialog: MatDialog, private zone: NgZone, private ngxService: NgxUiLoaderService) {

  }
  ngOnInit(): void {


  }
  userform = this.formmm.group({
    userName: this.formmm.control('', Validators.required),
    password: this.formmm.control('', Validators.required)
  });

  Login() {
    this.ngxService.start();

    if (this.userform.valid && this.userform.get('userName')?.value != null && this.userform.get('userName')?.value) {

      Object.assign(this.user, this.userform.value);
      this.userservice.loginUser(this.user.userName, this.user.password).subscribe(d => {
        if (d != null) {
          this.user = d;
          if (this.user.id != null) {


            this.zone.run(() => {
              this.ngxService.start();
            });
            sessionStorage.setItem("uid", this.user.id + "");
            this.router.navigate(['/main/feed']);
            this.ngxService.stop();


          }
        }
        else {
          this.ngxService.stop();
          const config = new MatSnackBarConfig();
          config.duration = 2000
          config.panelClass = ['background-red'];
          config.verticalPosition = 'bottom';
          config.horizontalPosition = 'center';
          this.zone.run(() => {
            this._snackBar.open('Something Went Wrong , Please check you crendentials', 'x', config,
            );
          });
        }
      },
        (e: HttpErrorResponse) => {
          const config = new MatSnackBarConfig();
          config.duration = 2000
          config.panelClass = ['background-red'];
          config.verticalPosition = 'top';
          config.horizontalPosition = 'center';
          this.zone.run(() => {
            this._snackBar.open('Please try again later...', 'x', config,
            );
          });
         
          
          this.spinnerService.hide();
          this.ngxService.stop();
          // Should print 'The Category Name is taken'
        }


      );
    }

  }


}
