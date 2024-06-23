import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from './userservice.service';

@Injectable({

  providedIn: 'root'

})

export class AuthGuard implements CanActivate {

  constructor(private authService: UserserviceService, private router: Router) {}

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
      let id=this.authService.loggedinUSer();
      if (id==null) {
       alert("Please login to continue.")
         this.router.navigate(['/login']); // go to login if not authenticated

         return false;

      }

    return true;

  }

  

}
