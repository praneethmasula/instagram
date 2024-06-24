import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { User } from 'src/user';
import { FileHandler } from 'src/filehandler';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from '../chat.service';
import { Message } from 'message';
import { SearchUSerForChatComponent } from '../search-user-for-chat/search-user-for-chat.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  user: User = new User();
  userrr: User = new User();
  following: User[] = [];
  count: number = 0;
  load:string='no';
  readonly dialog = inject(MatDialog);
  preview: Message[] = [];
  id: any;
  s: string = '';
  constructor(private r: Router, private ser: UserserviceService, private sanitizer: DomSanitizer, private cs: ChatService, private rr: ActivatedRoute) {
    this.closeNav();



    let id = this.ser.loggedinUSer();

    if (id != null) {
      this.id = id;
    }

    this.ser.getUserbyId(this.id).subscribe(d => {
      this.user = d;



      // this.user=d.files.sort(function(a:any,b:any){
      //        b.file.id-a.file.id;
      // });
      this.user = this.createImageg(this.user);
      this.ser.getFollowing(this.id).subscribe(d => {
        this.following = d;
        for (let i = 0; i < this.following.length; i++) {
          for (let j = 0; j < this.following.length; j++) {
            if (JSON.stringify(this.following[i].id) == JSON.stringify(this.following[j].id)) {
              this.following[i].isFollowing = 'yes';
              

            }
            else {
              this.following[i].isFollowing = 'no';

            }

          }

        }
        for (let e of this.following) {
          this.createImageg(e);

        }

        cs.getAllMessagesById(this.id).subscribe(d => {
          this.preview = d;
          for (let e of this.preview) {
            this.ser.getUserbyId(parseInt(e.to)).subscribe(d => {
              this.userrr = d;
              e.files = this.userrr.files;
              this.createImagegs(e);
              this.load='yes' 

              
            });
          }

          let iddd = rr.snapshot.paramMap.get('id');
          if (iddd != null) {
            
            let e = document.getElementById("rot");
            let ele = document.getElementById("rem")
            ele?.remove()
            e?.classList.add('flex-1')
            this.goTo(iddd);
          }
        })
      },
        (e: HttpErrorResponse) => {
          alert('please try again later...')
          
          // Should print 'The Category Name is taken'
        });
    });




  }

  closeNav() {
    
    var ele = document.getElementById("mesages");
    var ele1 = document.getElementById("sidebar");
    var elements = document.querySelectorAll<HTMLElement>('.he');
    if (elements != null) {





    }

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

  createImagegs(em: Message) {
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


  public goTo(id: any) {
    let e = document.getElementById("rot");
    let ele = document.getElementById("rem")
    ele?.remove()
    
    e?.classList.add('flex-1')
    this.count++;
    if (this.count % 2 != 0) {
      this.r.navigate((['/main/messages/direct', id]));

    }
    else {
      this.r.navigate((['/main/messagess/direct', id]));

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

  navv() {
    this.r.navigate(['/main/messages/direct'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchUSerForChatComponent, {
      data: {},
    });
  }

  // dialogRef.afterClosed().subscribe(result => {
  //   
  //   if (result !== undefined) {
  //     // this.animal.set(result);
  //   }
  // });


}


