import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FileHandler } from 'src/filehandler';
import { PostserviceService } from '../postservice.service';
import { UserserviceService } from '../userservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  id!: number;
  user: User = new User();


  tem: User = new User();


  constructor(private santizer: DomSanitizer, private r: ActivatedRoute, private ser: UserserviceService, private psotservice: PostserviceService, private spinnerService: NgxSpinnerService, private rou: Router, private ngxService: NgxUiLoaderService) {

  }
  ngOnInit(): void {

    let id = this.ser.loggedinUSer();
    if (id != null || id != undefined) {
      this.id = parseInt(id);
    }
    this.ser.getUserbyId(this.id).subscribe(d => {
      this.user = d;
      this.user = this.createImage(this.user);
      this.tem = this.user;
    });

  }



  onFileChanged(event: any) {


    console.log("sfsfdg")
    const selectedfile = event.target.files[0];
    console.log(selectedfile)
    const filehandle: FileHandler = {
      file: selectedfile,
      url: this.santizer.bypassSecurityTrustUrl(window.URL.createObjectURL(selectedfile))
    }
    if (this.user.files != undefined) {
      this.user.files.push(filehandle)
    }

    // this.createPost();


  }

  prepareFormDataa(e: User): FormData {
    console.log(e)
    const formdata = new FormData();
    formdata.append('e', new Blob([JSON.stringify(e)], { type: 'application/json' }));
    if (e.files != undefined) {
      for (var i = 0; i < e.files.length; i++) {
        formdata.append('file', e.files[i].file, e.files[i].file.name);
      }
    }
    return formdata;

  }

  createPost() {
    this.ngxService.start();
    if ((this.tem.bio != this.user.bio || this.tem.bio == this.user.bio) && this.user.files.length != 0) {

      const formdat = this.prepareFormDataa(this.user);
      console.log(this.user);
      this.ser.updateUser(formdat, 1).subscribe(d => {

        this.ngxService.stop();
        this.rou.navigate(['/main/profile'])


      });
    }
    else {

      this.ser.updateUSerBio(this.user.bio, this.user.id).subscribe(d => {
        this.ngxService.stop();
        this.rou.navigate(['/main/profile'])


      })

    }


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
            url: this.santizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files))
          }
          imgofFilehandle.push(filehandle);
        }
        em.files = imgofFilehandle;

      }

    }
    return em;
  }

}
