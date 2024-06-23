import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatepostComponent } from '../createpost/createpost.component';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  dialogConfig = new MatDialogConfig();
  constructor(private dialog:Dialog,private rou:ActivatedRoute,private user:UserserviceService,private rr:Router){

  }
  post=[1,2,4];
  id:any;
  ngOnInit(): void {
   this.id=this.user.loggedin();
   this.rr.navigate(['/feed',this.id])
  }
  openDialog(){
    this.dialog.open(CreatepostComponent,{
      data:{
        title:2
      }
    });
  
  }
}
