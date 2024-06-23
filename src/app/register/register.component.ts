import { Component } from '@angular/core';
import { FormBuilder, FormControl, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/user';
import { UserserviceService } from '../userservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { validateBasis } from '@angular/flex-layout';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formmm:FormBuilder,private router:Router,private uservice:UserserviceService,private spinnerService: NgxSpinnerService,private ngxService: NgxUiLoaderService){

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
    name:this.formmm.control('',[Validators.required,Validators.min(5)])
  });

  Login(){
   
  
    if(this.userform.valid){
      let e=this.userform.value.userName;
      if(e!=null){
        this.uservice.isUserNameAvailable(e+'').subscribe(d=>{
                   if(d=='true'){
                    
                      this.already='yes' 
                    
                   }   
        }) ;     
      }


      if(this.already=='false')
        this.ngxService.start();
      Object.assign(this.user, this.userform.value);
      this.uservice.saveUser(this.user).subscribe(d=>{
        if(d!=null  && d!=undefined &&d=="saved"){
          this.ngxService.stop();
          this.router.navigate(['/login'])
        }

      });
    
  
    }

  }

}
