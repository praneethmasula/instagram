import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { PostserviceService } from '../postservice.service';
import { Post } from 'src/post';
import { FileHandler } from 'src/filehandler';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog} from '@angular/material/dialog';
import { NgZone } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  id!:number;
  posts:Post[]=[];
  ngOnInit(): void {
          let id=this.ser.loggedinUSer();
          if(id!=null || id!=undefined){
            this.id=parseInt(id);
          }
          this.postser.getPostOfOwn(this.id).subscribe(d=>{
               if(d!=null){
                this.posts=d;
                for(let p of this.posts){
                  this.createImage(p);
                }
               }
          })   
  }
  constructor(private ser:UserserviceService,private postser:PostserviceService,private sanitizer:DomSanitizer,private dialog:MatDialog,private zone: NgZone){

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

  openPost(s:any,s1:any,s2:any,s3:any,s4:any){
    this.zone.run(() => {
      this.dialog.open(PostComponent, { data:{"url":s,"caption":s1,"likes":s2,"commment":s3,"time":s4,"uname":this.posts[0].user.userName},width: '800px',height:'400px' });
    });
  }


}
