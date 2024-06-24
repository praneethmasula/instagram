import {  inject, signal } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserserviceService } from './userservice.service';
import { Post } from 'src/post';
import { PostserviceService } from './postservice.service';
import { FileHandler } from 'src/filehandler';
import { User } from 'src/user';
import { DomSanitizer } from '@angular/platform-browser';

export const resolveResolver: ResolveFn<any> = (route, state,us=inject(UserserviceService),ps=inject(PostserviceService),san=inject(DomSanitizer)) => {
  
 let  iddd=us.loggedinUSer();

 
 let id:any
 if(iddd!=null){
  id=parseInt(iddd);
 }
 let  post:Post[]=[];
  
 let  pos=signal<Post[]>([]);
  let postLiked:Post[]=[];
  if(id!=null){
  ps.getPostsLikedByUSer(id).subscribe(d=>{
      postLiked=d;
      ps.getPostsByUSerId(parseInt(id)).subscribe(d=>{
        post=d;
        for(let e of post){
          createImage(e);
          createImagee(e.user)

        }
       
   
        for(var i=0;i<post.length;i++){
          
          for(var j=0;j<postLiked.length;j++){
            
                  if(post[i].id==postLiked[j].id){
                    
                  post[i].isliked=true;
                  }
                }
                post[i].noOfMins=calculatrTime(post[i].postedTime)+'';
    
        }
        
       return pos.set(post);
      
      })
    })
   

  }

function  calculatrTime(d:Date){
    var startTime = new Date(d); 
var endTime = new Date();
var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
var resultInMinutes = Math.round(difference / 60000);

if(resultInMinutes<60){
  return resultInMinutes+'min';
}
resultInMinutes=Math.round(difference / 3600000);

if( resultInMinutes<24){

  return resultInMinutes+'h'
  
}
resultInMinutes=Math.round(difference / 86400000);
if(resultInMinutes>1){
  return resultInMinutes+'d'
  }
return d;


  }



 function  createImage(em:Post){
    if(em!=undefined){
      const images:any[]=em.files;
      const imgofFilehandle:FileHandler[]=[];
      if(images!=undefined){

        for(var i=0;i<images.length;i++){
          const imagedata=images[i];
          const imgblob=dataurltoBlob(imagedata.picbyte,imagedata.type);
          const files=new File([imgblob],imagedata.name,{type:imagedata.type});
          const filehandle:FileHandler={
            file:files,
            url:san.bypassSecurityTrustUrl(window.URL.createObjectURL(files))
          }
          imgofFilehandle.push(filehandle);
        }
        em.files=imgofFilehandle;

      }
    
    } 
    return em;
  }

 function createImagee(em:User){
    if(em!=undefined){
      const images:any[]=em.files;
      const imgofFilehandle:FileHandler[]=[];
      if(images!=undefined){

        for(var i=0;i<images.length;i++){
          const imagedata=images[i];
          const imgblob=dataurltoBlob(imagedata.picbyte,imagedata.type);
          const files=new File([imgblob],imagedata.name,{type:imagedata.type});
          const filehandle:FileHandler={
            file:files,
            url:san.bypassSecurityTrustUrl(window.URL.createObjectURL(files))
          }
          imgofFilehandle.push(filehandle);
        }
        em.files=imgofFilehandle;

      }
    
    } 
    return em;
  }

  function dataurltoBlob(picBytes:any,imageType:any){
    const bytestring =window.atob(picBytes);
    const arraybuffer=new ArrayBuffer(bytestring.length);
    const intbuffer=new Uint8Array(arraybuffer);
    for(var i=0;i<bytestring.length;i++){
      intbuffer[i]=bytestring.charCodeAt(i);
    }
    const blob=new Blob([intbuffer],{type:imageType});
    return blob;
  }
};


