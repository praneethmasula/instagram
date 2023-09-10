import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/user';
import { UserserviceService } from '../userservice.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formmm:FormBuilder,private router:Router,private uservice:UserserviceService,private spinnerService: NgxSpinnerService){

  }
  user:User=new User();
  val:string="line-spin-fade";
  ngOnInit(): void {

    
  }
  userform=this.formmm.group({
    userName:this.formmm.control('',Validators.required),
    password:this.formmm.control('',Validators.required),
    phooneNumber:this.formmm.control('',Validators.required),
    name:this.formmm.control('',Validators.required)
  });

  Login(){
    this.spinnerService.show();
    if(this.userform.valid){
    
      Object.assign(this.user, this.userform.value);
      this.uservice.saveUser(this.user).subscribe(d=>{
        if(d!=null  && d!=undefined &&d=="saved"){
          this.spinnerService.hide();
          this.router.navigate(['/login'])
        }

      })
      
    }

  }

}
