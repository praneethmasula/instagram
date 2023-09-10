import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { CreatepostComponent } from '../createpost/createpost.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   dialogConfig = new MatDialogConfig();
  constructor(private dialog:Dialog,private rou:ActivatedRoute,private user:UserserviceService,private rr:Router){

  }
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
