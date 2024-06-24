import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({

  providedIn: 'root'

})

export class AuthGuard implements CanActivate {

  constructor(private authService: UserserviceService, private router: Router,private zone: NgZone,private _snackBar: MatSnackBar) {}

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
      let id=this.authService.loggedinUSer();
      if (id==null) {
        const config = new MatSnackBarConfig();
        config.duration = 2000
        config.panelClass = ['background-red'];
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        this.zone.run(() => {
          this._snackBar.open('Please try again later...', 'x', config,
          );
          this.router.navigate(['/login']); 
        });
       // go to login if not authenticated

         return false;

      }

    return true;

  }

  

}
