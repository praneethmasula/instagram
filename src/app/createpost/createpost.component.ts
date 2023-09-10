import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandler } from 'src/filehandler';
import { Post } from 'src/post';
import { UserserviceService } from '../userservice.service';
import { PostserviceService } from '../postservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit{


post:Post=new Post();

dataaa:any;
  constructor(private santizer:DomSanitizer,private r:ActivatedRoute,   private dialogRef: MatDialogRef<CreatepostComponent>,
    @Inject(MAT_DIALOG_DATA) public  data:any,private ser:UserserviceService,private psotservice:PostserviceService,private spinnerService: NgxSpinnerService,private rou:Router){

  }
  ngOnInit(): void {
  let id=sessionStorage.getItem("uid");
  if(id!=null){
   this.dataaa=parseInt(id);
  }
   console.log(this.dataaa)
    this.post.caption="Attitude";
    this.post.postedTime=new Date();
   
    this.post.location="hyderabad"

  
    
  }



  onFileChanged(event:any){
 
this.spinnerService.show();

    const selectedfile=event.target.files[0];
    const filehandle:FileHandler={
      file:selectedfile,
      url:this.santizer.bypassSecurityTrustUrl(window.URL.createObjectURL(selectedfile))
    }
    if(this.post.files!=undefined){
      this.post.files.push(filehandle)
    }

    this.createPost();

  }
  prepareFormData(e:Post):FormData{

    const formdata=new FormData();
    formdata.append('e',new Blob([JSON.stringify(e)], { type: 'application/json' }));
    if(e.files!=undefined){
      for(var i=0;i<e.files.length;i++){
        formdata.append('file',e.files[i].file,e.files[i].file.name);
      }
    }
    return formdata;

  }

  createPost(){
    
   
    const formdat=this.prepareFormData(this.post);
    console.log(this.post);
    this.psotservice.savePsot(formdat,this.dataaa).subscribe(d=>{

      if(d!=null || d=="200"){

    
         this.spinnerService.hide();
        this.rou.navigate(['/main/feed',this.dataaa]);

      }
      else{

      }

    })


  }
}
