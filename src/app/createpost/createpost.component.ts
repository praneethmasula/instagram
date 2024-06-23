import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandler } from 'src/filehandler';
import { Post } from 'src/post';
import { UserserviceService } from '../userservice.service';
import { PostserviceService } from '../postservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/user';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {


  post: Post = new Post();
  public imagePath: any;
  imgURL: any;
  public message: string | undefined;
  preview(files: any) {
    let ele = document.getElementById('ww');
    if (ele != null) {
      let esl: HTMLElement = ele;
      if (esl != null) {
        esl.style.display = "none";
      }
    }

    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  dataaa: any;
  constructor(private santizer: DomSanitizer, private r: ActivatedRoute, private dialogRef: MatDialogRef<CreatepostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private ser: UserserviceService, private psotservice: PostserviceService, private spinnerService: NgxSpinnerService, private rou: Router, private ngxService: NgxUiLoaderService, private sanitizer: DomSanitizer,) {

  }
  ngOnInit(): void {
    let id = sessionStorage.getItem("uid");

    if (id == null) {
      alert('Please login to continue');
      this.rou.navigate(['/login']);
    }
    if (id != null) {
      this.dataaa = parseInt(id);
    }
    console.log(this.dataaa)
    // this.post.caption="Attitude";
    this.post.likes = 0;
    this.post.postedTime = new Date();
    this.post.location = "hyderabad"
  }

  close() {
    this.dialogRef.close()
  }

  sharePost() {
    this.createPost();
  }



  onFileChanged(event: any) {


    //this.ngxService.start();
    const selectedfile = event.target.files[0];
    const filehandle: FileHandler = {
      file: selectedfile,
      url: this.santizer.bypassSecurityTrustUrl(window.URL.createObjectURL(selectedfile))
    }
    if (this.post.files != undefined) {
      this.post.files.push(filehandle)
    }

    // this.createPost();

  }
  prepareFormData(e: Post): FormData {

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
    this.ngxService.start()

    const formdat = this.prepareFormData(this.post);
    console.log(this.post);
    this.psotservice.savePsot(formdat, this.dataaa).subscribe(d => {
      location.reload();
      if (d != null || d == "saved") {


        this.rou.navigate(['/main/feed']);
        this.ngxService.stop();

      }
      else {
        alert("Please try again.");
      }

    });


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
            url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files))
          }
          imgofFilehandle.push(filehandle);
        }
        em.files = imgofFilehandle;

      }

    }
    return em;
  }
}
