import { Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FileHandler } from 'src/filehandler';

import { User } from 'src/user';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-followrs',
  templateUrl: './followrs.component.html',
  styleUrls: ['./followrs.component.css']
})
export class FollowrsComponent implements OnInit {

  followers: User[] = [];
  f: User[] = [];
  c: number = 0;
  fo: string = '';
  ff: User[] = [];

  fe: User[] = [];
  foo: string = '';
  own: string = '';
  id!: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private r: Router, private ngxService: NgxUiLoaderService, private dialogRef: MatDialogRef<FollowrsComponent>, private sanitizer: DomSanitizer, private rr: ActivatedRoute, private s: UserserviceService) {
    // 
    this.followers = data.data;
    this.fo = data.followers;
    this.foo = data.following;
    this.own = data.ownProfile;
    
    let id = this.s.loggedinUSer()
    //  if(id==null){
    //   alert("Please login to contiue")
    //   this.r.navigate(['/login'])
    // }
    this.id = parseInt(id != null ? id : '');





    //  for(let i=0;i<this.followers.length;i++){
    //   // this.f[i]=this.followers[i];
    //   // if(this.followers[i].files==undefined || this.followers[i].files==null || this.followers[i].files.length==0 ){
    //   //   this.f[i].isNull='yes';
    //   // }
    //  }


  }
  ngOnInit(): void {




    // throw new Error('Method not implemented.');
  }


  goToProfile(id: any) {


    this.ngxService.start();
    this.dialogRef.close();
    
    let ii = this.s.loggedinUSer();
    
    
    if (id + "" == ii) {

      this.r.navigate((['/main/profile']));
      this.ngxService.stop();
      return

    }

    if (window.location.pathname.includes('otherss')) {
      this.r.navigate((['/main/others', id]));
      this.ngxService.stop()
    }
    else {
      this.r.navigate((['/main/otherss', id]));
      this.ngxService.stop()

    }

    this.ngxService.stop();
  }


  createImage(em: User) {
    if (em != undefined) {
      const images: any[] = em.files;
      const imgofFilehandle: FileHandler[] = [];
      if (images != undefined) {

        for (var i = 0; i < images.length; i++) {
          const imagedata = images[i];
          const imgblob = this.dataurltoBlob(imagedata.picbyte, imagedata.type);
          const files = new File([imgblob], imagedata.name, { type: imagedata.type });
          const filehandle: FileHandler = {
            file: files,
            url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files))
          }
          imgofFilehandle.push(filehandle);
        }
        em.files = imgofFilehandle;

      }

    }
    return em;
  }

  public dataurltoBlob(picBytes: any, imageType: any) {
    const bytestring = window.atob(picBytes);
    const arraybuffer = new ArrayBuffer(bytestring.length);
    const intbuffer = new Uint8Array(arraybuffer);
    for (var i = 0; i < bytestring.length; i++) {
      intbuffer[i] = bytestring.charCodeAt(i);
    }
    const blob = new Blob([intbuffer], { type: imageType });
    return blob;
  }

}
