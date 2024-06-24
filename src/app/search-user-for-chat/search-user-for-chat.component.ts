import { Component, effect, signal } from '@angular/core';
import { User } from 'src/user';
import { UserserviceService } from '../userservice.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FileHandler } from 'src/filehandler';

@Component({
  selector: 'app-search-user-for-chat',
  templateUrl: './search-user-for-chat.component.html',
  styleUrls: ['./search-user-for-chat.component.css']
})
export class SearchUSerForChatComponent {
  val = signal('');
  filteroptions = signal<User[]>([]);
  userrr: User[] = [];
  loggesin: any;
  constructor(private sanitizer: DomSanitizer, private dialogRef: MatDialogRef<SearchUSerForChatComponent>, private dialog: MatDialog, private rou: ActivatedRoute, private user: UserserviceService, private rr: Router, private ngxService: NgxUiLoaderService,) {
    this.fetchData();
    this.loggesin = user.loggedinUSer();
    effect(() => {
      
      this.filterResults(this.val())

    },
      {
        allowSignalWrites: true
      });
  }


  goToProfile(id: any) {
    if (id != this.loggesin) {
      this.dialogRef.close();
      let e = document.getElementById("rot");
      let ele = document.getElementById("rem")
      ele?.remove()
      
      e?.classList.add('flex-1')
      this.rr.navigate(['/main/messages/direct', id])
    }

  }


  filterResults(text: string) {
    if (!text) {
      this.filteroptions.set([]);
      return;
    }

    this.filteroptions.set(this.userrr.filter(
      ele => ele.userName.toLowerCase().includes(text.toLowerCase())
    ));


  }


  fetchData() {
    this.user.searchValues().subscribe(d => {
      this.userrr = d;
      for (let e of this.userrr) {
        this.createImage(e);
      }
    })
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

