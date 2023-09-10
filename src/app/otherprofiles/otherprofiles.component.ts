import { Component } from '@angular/core';
import { Post } from 'src/post';
import { UserserviceService } from '../userservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostserviceService } from '../postservice.service';
import { FileHandler } from 'src/filehandler';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/user';
import { Dialog } from '@angular/cdk/dialog';
import { PostComponent } from '../post/post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-otherprofiles',
  templateUrl: './otherprofiles.component.html',
  styleUrls: ['./otherprofiles.component.css']
})
export class OtherprofilesComponent {

  id!:number;
  posts:Post[]=[];
  user:User=new User();
  ngOnInit(): void {
        let id=this.routerrr.snapshot.paramMap.get('id');
          if(id!=null || id!=undefined){
            this.id=parseInt(id);
          }
          this.userv.getUserbyId(this.id).subscribe(d=>{
            this.user=d;
          })
          this.postser.getPostOfOwn(this.id).subscribe(d=>{
               if(d!=null){
                this.posts=d;
                for(let p of this.posts){
                  this.createImage(p);
                }
               }
          })   
  }
  constructor(private ser:UserserviceService,private postser:PostserviceService,private sanitizer:DomSanitizer,private routerrr:ActivatedRoute,private userv:UserserviceService,private dialog:MatDialog){

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

  openPost(){

this.dialog.open(PostComponent);

  }


}
