import { Component, NgZone, signal } from '@angular/core';
import { Post } from 'src/post';
import { UserserviceService } from '../userservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostserviceService } from '../postservice.service';
import { FileHandler } from 'src/filehandler';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/user';
import { Dialog } from '@angular/cdk/dialog';
import { PostComponent } from '../post/post.component';
import { MatDialog } from '@angular/material/dialog';
import { Friends } from 'friends';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FollowrsComponent } from '../followrs/followrs.component';

@Component({
  selector: 'app-otherprofiles',
  templateUrl: './otherprofiles.component.html',
  styleUrls: ['./otherprofiles.component.css']
})
export class OtherprofilesComponent {
  friends = signal<Friends>(new Friends());
  id!: number;
  Frd: Friends = new Friends();
  followers: User[] = [];
  following: User[] = [];
  posts: Post[] = [];
  loggedinuserf: User[] = [];
  loggedinFolow: User[] = [];
  loggedInid!: number;
  user: User = new User();
  load: string = 'no';
  status: string = 'false'
  mutauls: string = 'false'

  constructor(private ser: UserserviceService, private postser: PostserviceService, private sanitizer: DomSanitizer, private dialog: MatDialog, private zone: NgZone, private ro: ActivatedRoute, private ngxService: NgxUiLoaderService, private r: Router) {
    let id = this.ro.snapshot.paramMap.get('id');
    let idd = this.ser.loggedinUSer();
    if (id?.includes("\"")) {
      id = id.substring(1);
    }
    if (id != null && id != undefined && idd != null) {
      this.loggedInid = parseInt(idd);
      this.id = parseInt(id);
      this.ser.friendStatus(parseInt(idd), this.id).subscribe(d => {
        this.Frd = d;
        
        if (d.status == '') {
          this.Frd.status = 'noo';
        }
        this.friends.set(this.Frd);
        if (this.friends().status == 'accepted') {
          this.status = 'true'
        }

        this.postser.getPostOfOwn(this.id).subscribe(d => {
          if (d != null) {
            this.posts = d;
            for (let p of this.posts) {
              this.createImage(p);
            }
          }

          this.ser.getUserbyId(this.id).subscribe(d => {
            this.user = d;
            this.user = this.createImageg(this.user);
            this.ser.getFollowers(this.id).subscribe(d => {
              this.followers = d;
              for (let e of this.followers) {
                this.createImageg(e);
              }

              this.ser.getFollowers(this.loggedInid).subscribe(d => {

                this.loggedinuserf = d;

                this.ser.getFollowing(this.id).subscribe(d => {
                  this.following = d;
                  for (let e of this.following) {
                    this.createImageg(e);
                  }


                  this.ser.getFollowing(this.loggedInid).subscribe(dd => {
                    this.loggedinFolow = dd;
                    this.load = 'yes'
                    for (let e of this.loggedinFolow) {
                      this.createImageg(e);
                    }
                    for (let i = 0; i < this.followers.length; i++) {
                      for (let j = 0; j < this.loggedinFolow.length; j++) {
                        if (JSON.stringify(this.followers[i].id) == JSON.stringify(this.loggedinFolow[j].id)) {
                          this.followers[i].isFollowing = 'yes';
                          this.mutauls = 'yes'
                          
                        }
                        else {
                          this.followers[i].isFollowing = 'no';


                        }
                      }
                    }


                  });

                });

              });

            });

          });

        });
      });
    }
  }

  url: any;
  openTab = 1;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
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


  go() {

    let e = document.getElementById("rot");
    let ele = document.getElementById("rem")
    ele?.remove()
    e?.classList.add('flex-1')
    this.r.navigate(['/main/messages', this.id])

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
  showFollowers() {
    this.ngxService.start();
    this.dialog.open(FollowrsComponent, {

      height: '350px',
      width: '400px',
      data: {
        data: this.followers,
        'followers': 'yes',
        'id': this.id
      },



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
        'id': this.id
      },


    });
    this.ngxService.stop();
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



  sendRequest() {

    let ele = this.ser.loggedinUSer();
    if (ele != null) {
      this.ser.sendRequest(parseInt(ele), this.id).subscribe(d => {
        this.friends.set(d);
      });
    }
  }

  removeRequest() {

    let ele = this.ser.loggedinUSer();
    if (ele != null) {
      this.ser.removeeeRequest(parseInt(ele), this.friends().id).subscribe(d => {

        if (d.status == 'removed') {
          d.status = 'noo';
          this.friends.set(d);
        }

      });
    }

  }


}
