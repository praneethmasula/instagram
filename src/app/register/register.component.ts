import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormControl, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/user';
import { UserserviceService } from '../userservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { validateBasis } from '@angular/flex-layout';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formmm:FormBuilder,private router:Router,private uservice:UserserviceService,private spinnerService: NgxSpinnerService,private ngxService: NgxUiLoaderService,private zone: NgZone, private ngxSersvice: NgxUiLoaderService, private _snackBar: MatSnackBar){

  }
  user:User=new User();
  val:string="line-spin-fade";
  already:string='false';
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  ngOnInit(): void {

    
  }


  userform=this.formmm.group({
    userName:this.formmm.control('',[Validators.required,Validators.minLength(3)]),
    password:this.formmm.control('',[Validators.required,Validators.minLength(5)]),
    phooneNumber:this.formmm.control('',[Validators.required,Validators.pattern("^(0|[1-9][0-9]{0,100})$"),Validators.minLength(10),Validators.maxLength(10)]),
    name:this.formmm.control('',[Validators.required,Validators.minLength(5)])
  });

  Login(){
   
  
    if(this.userform.valid){
      let e=this.userform.value.userName;
      if(e!=null){
        this.uservice.isUserNameAvailable(e+'').subscribe(d=>{
                   if(d=='true'){
                    
                      this.already='yes';
                   } 

                   if(this.already=='false'){
                    this.ngxService.start();
                    Object.assign(this.user, this.userform.value);
                    this.uservice.saveUser(this.user).subscribe(d=>{
                    if(d!=null  && d!=undefined &&d=="saved"){
                      this.ngxService.stop();
                      const config = new MatSnackBarConfig();
                      config.duration = 3000
                      config.panelClass = ['background-red'];
                      config.verticalPosition = 'top';
                      config.horizontalPosition = 'right';
                      this.zone.run(() => {
                        this._snackBar.open('SigneUp Success', 'x', config,
                        );
                        this.userform.reset();
                      });
                      this.router.navigate(['/login'])
                    }
            
                  });
                }

        }
,
        (e: HttpErrorResponse) => {
          
          const config = new MatSnackBarConfig();
          config.duration = 3000
          config.verticalPosition = 'top';
          config.horizontalPosition='right'
         
          this.zone.run(() => {
            this._snackBar.open('Something Went Wrong', 'x', config,
            );
          });

        }
        
        
        ) ;     
      }


     
    
  
    }

  }

}
