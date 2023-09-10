import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Post } from 'src/post';
import { PostserviceService } from '../postservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileHandler } from 'src/filehandler';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { CreatepostComponent } from '../createpost/createpost.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  id:any;
  post:Post[]=[];
  

  constructor(private rou:ActivatedRoute,private pose:PostserviceService,private spinnerService: NgxSpinnerService,private sanitizer:DomSanitizer,private dialogRef: MatDialogRef<CreatepostComponent>){

  }
  ngOnInit(): void {

    this.spinnerService.show();
    this.id=this.rou.snapshot.paramMap.get('id');
    if(this.id!=null){
      this.pose.getPostsByUSerId(parseInt(this.id)).subscribe(d=>{
        this.post=d;
        for(let e of this.post){
          this.createImage(e);
        }
        this.spinnerService.hide();
      })

    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
    createImage(em:Post){
      if(em!=undefined){
        const images:any[]=em.files;
        const imgofFilehandle:FileHandler[]=[];
        if(images!=undefined){

          for(var i=0;i<images.length;i++){
            const imagedata=images[i];
            const imgblob=this.dataurltoBlob(imagedata.picbyte,imagedata.type);
            const files=new File([imgblob],imagedata.name,{type:imagedata.type});
            const filehandle:FileHandler={
              file:files,
              url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files))
            }
            imgofFilehandle.push(filehandle);
          }
          em.files=imgofFilehandle;

        }
      
      } 
      return em;
    }

  public dataurltoBlob(picBytes:any,imageType:any){
    const bytestring =window.atob(picBytes);
    const arraybuffer=new ArrayBuffer(bytestring.length);
    const intbuffer=new Uint8Array(arraybuffer);
    for(var i=0;i<bytestring.length;i++){
      intbuffer[i]=bytestring.charCodeAt(i);
    }
    const blob=new Blob([intbuffer],{type:imageType});
    return blob;
  }


}
