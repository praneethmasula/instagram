import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileHandler } from 'src/filehandler';
import { Post } from 'src/post';
import { CreatepostComponent } from '../createpost/createpost.component';
import { PostserviceService } from '../postservice.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component {
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
