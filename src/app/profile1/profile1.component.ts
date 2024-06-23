import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from 'src/filehandler';
import { Post } from 'src/post';
import { PostComponent } from '../post/post.component';
import { PostserviceService } from '../postservice.service';
import { UserserviceService } from '../userservice.service';
import { User } from 'src/user';
import { FollowrsComponent } from '../followrs/followrs.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.css']
})
export class Profile1Component {
  id!: number;
  posts: Post[] = [];
  followers: User[] = [];
  following: User[] = [];
  loggedinuserf: User[] = [];
  loggedinFolow: User[] = [];
  user: User = new User();
  load: string = 'no';
  url: any;
  ngOnInit(): void {
    this.ngxService.start();
    let id = this.ser.loggedinUSer();
    // if(id==null){
    //   alert("Please login to continue");
    //   this.ro.navigate(['/login'])
    // }
    if (id != null || id != undefined) {
      this.id = parseInt(id);
    }
    this.ser.getUserbyId(this.id).subscribe(d => {
      this.user = d;

      // this.user=d.files.sort(function(a:any,b:any){
      //        b.file.id-a.file.id;
      // });
      this.user = this.createImageg(this.user);
      this.load = 'yes'
      this.ser.getFollowers(this.id).subscribe(d => {
        this.followers = d;
        for (let i = 0; i < this.followers.length; i++) {
          this.followers[i].isFollowing = 'yes';
        }
        for (let e of this.followers) {
          this.createImageg(e);

        }
      },
        (e: HttpErrorResponse) => {
          alert('please try again later...')
          console.log(e.error);
          // Should print 'The Category Name is taken'
        });
      this.ser.getFollowing(this.id).subscribe(d => {
        this.following = d;
        for (let i = 0; i < this.followers.length; i++) {
          for (let j = 0; j < this.following.length; j++) {
            if (JSON.stringify(this.followers[i].id) == JSON.stringify(this.following[j].id)) {
              this.followers[i].isFollowing = 'yes';
              console.log("fredsss")

            }

            else {
              this.followers[i].isFollowing = 'no';

            }
          }

        }
        for (let e of this.following) {
          this.createImageg(e);

        }

        this.ngxService.stop();
      },
        (e: HttpErrorResponse) => {
          alert('please try again later...')
          console.log(e.error);
          // Should print 'The Category Name is taken'
        });
    })
    this.postser.getPostOfOwn(this.id).subscribe(d => {
      if (d != null) {
        this.posts = d;
        for (let p of this.posts) {
          this.load = 'yes'
          this.createImage(p);
        }
      }
    },
      (e: HttpErrorResponse) => {
        alert('please try again later...')
        console.log(e.error);
        // Should print 'The Category Name is taken'
      })
  }
  constructor(private ser: UserserviceService, private postser: PostserviceService, private sanitizer: DomSanitizer, private dialog: MatDialog, private zone: NgZone, private ngxService: NgxUiLoaderService, private ro: Router) {

  }
  createImageg(em: User) {
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


  editProfile() {
    this.ngxService.start();
    this.ro.navigate(['/main/accounts/edit']);
    this.ngxService.stop()
  }
  showFollowers() {
    this.ngxService.start();
    this.dialog.open(FollowrsComponent, {
      height: '350px',
      width: '400px',
      data: {
        data: this.followers,
        'followers': 'yes',
        'id': this.id
      }
    });
    this.ngxService.stop();
  }
  showFollowing() {
    this.ngxService.start();

    this.dialog.open(FollowrsComponent, {
      height: '350px',
      width: '400px',
      data: {
        data: this.following,
        'following': 'yes',
        'id': this.id,
        'ownProfile': 'yes'
      }
    });
    this.ngxService.stop();
  }
  open(s: string) {
    //   var i;
    // var x = document.querySelectorAll<HTMLElement>(".c");

    // var ele=['posts','tags'];
    // if(s=='posts'){
    //   var e=document.getElementById('tags');
    //   if(e!=null){
    //     e.style.display="none";
    //   }
    // }
    // else{
    //   var e=document.getElementById('posts');
    //   if(e!=null){
    //     e.style.display="none";
    //   }
    // }



  }

  openTab = 1;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }
  createImage(em: Post) {
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

  openPost(s: any, s1: any, s2: any, s3: any, s4: any) {
    this.zone.run(() => {
      this.dialog.open(PostComponent, { data: { "url": s, "caption": s1, "likes": s2, "commment": s3, "time": s4, "uname": this.posts[0].user.userName }, width: '800px', height: '400px' });
    });
  }


}

