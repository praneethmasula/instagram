import { Component, NgZone, OnInit, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Post } from 'src/post';
import { PostserviceService } from '../postservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileHandler } from 'src/filehandler';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { CreatepostComponent } from '../createpost/createpost.component';
import { UserserviceService } from '../userservice.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/user';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  id: any;
  post: Post[] = [];
  load: string = 'no';
  pos = signal<Post[]>([]);
  postLiked: Post[] = [];
  stock: any = {};
  likeChange = effect(() => {
    
  })
  constructor(private rou: ActivatedRoute, private pose: PostserviceService, private spinnerService: NgxSpinnerService, private sanitizer: DomSanitizer, private dialogRef: MatDialogRef<CreatepostComponent>, private ss: UserserviceService, private ngxService: NgxUiLoaderService, private rr: Router, private webSocket: WebSocket,private zone: NgZone,private _snackBar: MatSnackBar) {
    // this.webSocket = new WebSocket('ws://localhost:8080/stocks');
    // this.webSocket.onmessage = (event) => {
    //   this.stock = JSON.parse(event.data)
    //   
    // };
  }
  ngOnInit(): void {


    this.id = this.ss.loggedinUSer();
    if(this.id==null){
      const config = new MatSnackBarConfig();
          config.duration = 2000
          config.panelClass = ['background-red'];
          config.verticalPosition = 'top';
          config.horizontalPosition = 'center';
          this.zone.run(() => {
            this._snackBar.open('Please login to continue..', 'x', config,
            );
          });
      this.rr.navigate(['/login'])
    }
    if (this.id != null) {
      this.pose.getPostsLikedByUSer(this.id).subscribe(d => {
        this.postLiked = d;
        this.pose.getPostsByUSerId(parseInt(this.id)).subscribe(d => {
          this.post = d;
          for (let e of this.post) {
            this.createImage(e);
            this.createImagee(e.user)

          }
          
          
          for (var i = 0; i < this.post.length; i++) {
            
            for (var j = 0; j < this.postLiked.length; j++) {
              
              if (this.post[i].id == this.postLiked[j].id) {
                
                this.post[i].isliked = true;
              }
            }
            this.post[i].noOfMins = this.calculatrTime(this.post[i].postedTime) + '';

          }

          this.pos.set(this.post);
          if (this.post.length >= 0) {
            this.load = 'yes';

          }


        },

          (e: HttpErrorResponse) => {
            alert('please try again later...')
            

          });

      }
        ,
        (e: HttpErrorResponse) => {
          alert('please try again later...')
          

        })


    }
  }

  viewProfile(id: number) {
    
    
    
    this.ngxService.start();
    if (this.id == id) {

      this.rr.navigate(['/main/profile']);
      this.ngxService.stop();

    }
    else {
      this.rr.navigate(['/main/others', id]);
      this.ngxService.stop();
    }
  }

  calculatrTime(d: Date) {
    var startTime = new Date(d);
    var endTime = new Date();
    var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);

    if (resultInMinutes < 60) {
      return resultInMinutes + 'min';
    }
    resultInMinutes = Math.round(difference / 3600000);

    if (resultInMinutes < 24) {

      return resultInMinutes + 'h'

    }
    resultInMinutes = Math.round(difference / 86400000);
    if (resultInMinutes > 1) {
      return resultInMinutes + 'd'
    }
    return d;
    

  }

  closeDialog() {
    this.dialogRef.close();
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

  createImagee(em: User) {
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

  like(id: number) {

    this.pos.mutate((items) => {
      items.forEach(e => {
        if (e.id == id) {

          if (e.isliked) {
            e.isliked = false
            e.likes = e.likes - 1;
            this.pose.removePostLikes(id, this.id).subscribe(d => {
              
            })

          }
          else {
            e.isliked = true;
            e.likes = e.likes + 1;
            this.pose.updatePostLikes(id, this.id).subscribe(d => {
              
            })
          }

        }
      })
    });

  }







}
