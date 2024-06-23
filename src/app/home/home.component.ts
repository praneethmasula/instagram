import { Dialog } from '@angular/cdk/dialog';
import { Component, Injector, OnInit, Signal, effect, inject, runInInjectionContext, signal } from '@angular/core';
import { CreatepostComponent } from '../createpost/createpost.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserserviceService } from '../userservice.service';
import { User } from 'src/user';
import { Reuqest } from 'reuqest';
import { Friends } from 'friends';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { storage } from 'src/storageee';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FileHandler } from 'src/filehandler';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dialogConfig = new MatDialogConfig();
  userr: Friends[] = [];
  request: Reuqest[] = [];
  reqqq = signal<Reuqest[]>([]);
  injector = inject(Injector);
  count: number = 0;
  arr1: [] = [];
  userrr: User[] = [];
  sr: storage = new storage();
  st: storage[] = [];
  re = signal<number>(0);
  storagee: storage[] = [];
  filteroptions = signal<User[]>([]);
  sttt = signal<storage[]>([]);
  valss: any = {
    "id": '',
    "name": '',
    "userName": ''
  }
  arr: {
    "id": '',
    "name": '',
    "userName": ''
  }[] = [];
  val = signal('');
  formscontol = new FormControl('');
  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog, private rou: ActivatedRoute, private user: UserserviceService, private rr: Router, private ngxService: NgxUiLoaderService,) {
    effect(() => {
      console.log('counter value:' + this.val());
      this.filterResults(this.val())

    },
      {
        allowSignalWrites: true
      });
  }
  id: any;
  ngOnInit(): void {
    this.id = this.user.loggedinUSer();
    this.fetchData();
    this.user.getRequests(this.id).subscribe(d => {
      this.userr = d;
      if (this.userr.length > 0) {
        for (var i = 0; i < this.userr.length; i++) {
          if (this.userr[i].status == 'accepted') {
            var req = new Reuqest();
            req.id = this.userr[i].id;
            req.status = this.userr[i].status;
            req.userName = this.userr[i].user.userName;
            this.request.push(req);
          }
          else if (this.userr[i].status == 'sent') {
            var req = new Reuqest();
            req.id = this.userr[i].id;
            req.status = this.userr[i].status;
            req.userName = this.userr[i].user.userName;
            this.request.push(req);
          }
        }
      }
      this.reqqq.set(this.request);
      this.re.set(this.reqqq().length);
      this.ngxService.start();
      this.rr.navigate(['main/feed']);
      this.ngxService.stop()
    });
  }
  viewProfile(id: number) {
    this.closeNav();
    this.closeNavv();
    this.count++;
    console.log("id:dd" + id);
    console.log("sff:" + this.id)
    console.log(this.id == id)

    if (this.id == id) {
      this.rr.navigate(['/main/profile']);

    }
    else {
      if (this.count % 2 != 0) {
        this.rr.navigate((['/main/otherss', id]));

      }
      else {
        this.rr.navigate((['/main/others', id]));

      }
    }
  }


  searchvalue = '';
  fetchData() {
    this.user.searchValues().subscribe(d => {
      this.userrr = d;
      for (let e of this.userrr) {
        this.createImage(e);
      }
    })
  }

  clearSession() {
    this.sttt.set([]);
    localStorage.clear();
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

  navvigate(s: string) {
    this.closeNav();
    this.closeNavv();
    this.ngxService.start();
    this.rr.navigate(['main/' + s]);
    this.ngxService.stop();



  }

  commonClick(s: string) {

  }
  openDialog() {
    // this.ngxService.start();
    this.dialog.open(CreatepostComponent, {
      data: {
        title: 2
      }
    });

  }

  goToProfile(id: any) {
    this.closeNavv();
    this.count++;
    this.val.set('');
    var vaa = '';
    this.userrr.forEach(d => {
      if (d.id == parseInt(id)) {
        vaa += d.id + ",";
        vaa += d.userName + ",";
        vaa += d.name;
      }
    });


    var res = '';
    var ele = localStorage.getItem(this.id);
    console.log(ele)
    if (ele == null) {

      res += vaa;

    }
    if (ele != null) {
      var e = JSON.parse(ele)
      console.log(e);
      console.log(vaa)

      if (e == '' || e == "") {

        res += vaa;

      }
      else {
        console.log("pppppp");
        console.log(e.includes(vaa));
        console.log(e.includes(JSON.stringify(vaa)))
        if (!e.includes(vaa)) {

          res = res + ele + ":" + vaa;
        }

      }
    }
    console.log(res);
    if (res != '' && id != this.id) {
      localStorage.setItem(this.id, JSON.stringify(res));
    }
    var elle = id;

    //  this.filteroptions=this.formscontol.valueChanges.pipe(
    //   startWith(''),map(value=>this._FILTER(value || ''))
    //  )

    let idd = id;

    this.ngxService.start();
    if (id == this.id) {
      this.rr.navigate((['/main/profile']));
      this.ngxService.stop();
      return;
    }
    if (this.count % 2 != 0) {
      this.rr.navigate((['/main/otherss', id]));
      this.ngxService.stop();
    }
    else {
      this.rr.navigate((['/main/others', id]));
      this.ngxService.stop();
    }
  }
  logOut() {
    localStorage.clear();
    this.rr.navigate(['/login'])
    this.ngxService.stop();
  }

  AcceptRequst(id: number) {
    // this.reqqq.mutate((items)=>{
    //   items.forEach(e=>{
    //         if(e.id==id){
    //           e.status="accepted";
    //         }
    //   });
    // });

    this.user.acceptRequest(this.id, id).subscribe(d => {
      for (let i = 0; i < this.reqqq().length; i++) {
        if (this.reqqq()[i].id == id) {
          this.reqqq()[i].status = 'accepted';
        }
      }

    });


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

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = this.re() == 0;
  }
  openNavvvvv() {
    this.re.set(0);
    this.closeNav();
    this.closeNavv();
    var ele = document.getElementById("mySidenav");
    var ele1 = document.getElementById("sidebar");
    var elements = document.querySelectorAll<HTMLElement>('.he');
    if (ele != null && ele1 != null && elements != null) {
      ele.style.opacity = '1';
      ele.style.width = "300px";
      ele.hidden = false;
      ele.style.marginLeft = "0px"
      for (var i = 0; i < elements.length; i++) {
        elements[i].hidden = true;
      }



    }
  }
  openNav() {
    this.re.set(0);
    this.closeNav();
    this.closeNavv();
    var ele = document.getElementById("mySidenav");
    var ele1 = document.getElementById("sidebar");
    var elements = document.querySelectorAll<HTMLElement>('.he');
    if (ele != null && ele1 != null && elements != null) {
      ele.style.opacity = '1';
      ele.style.width = "400px";
      ele.hidden = false;
      ele.style.marginLeft = "65px"

      for (var i = 0; i < elements.length; i++) {
        elements[i].hidden = true;

      }



    }
  }

  closeNav() {
    var e = document.getElementById("mySidenav");
    var ele1 = document.getElementById("sidebar");
    var elements = document.querySelectorAll<HTMLElement>('.he');
    if (e != null && ele1 != null && elements != null) {
      e.style.width = "0";
      e.style.opacity = '0';
      e.hidden = true
      for (var i = 0; i < elements.length; i++) {
        elements[i].hidden = false;
      }

      e.style.marginLeft = "auto"

    }

  }

  getSessionValues() {

    this.id = this.user.loggedinUSer();
    var ele = localStorage.getItem(this.id);
    this.storagee = [];
    console.log(ele)
    if (ele != null) {
      var res = JSON.parse(ele).split(':')
      console.log(res);
    }
    if (res != null) {
      for (let i = 0; i < res.length; i++) {
        this.sr = new storage();
        var eee = res[i];
        var tt = eee.split(',');
        console.log(tt)
        this.sr.id = tt[0];
        this.sr.name = tt[1];
        this.sr.userName = tt[2];
        this.storagee.push(this.sr);
      }

    }
    console.log(this.storagee);
    this.sttt.set(this.storagee);
  }


  click() {
    console.log("searched")
  }

  openNavv(s: string) {

    this.getSessionValues();
    var ele = document.getElementById("mySidenavv");
    var ele1 = document.getElementById("sidebar");
    var elements = document.querySelectorAll<HTMLElement>('.he');
    if (ele != null && ele1 != null && elements != null) {
      ele.style.opacity = '1';
      ele.style.width = "400px";
      ele.style.marginLeft = "65px"
      ele.hidden = false;

      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('.hidden');
      }




    }
  }
  openNavvv(s: string) {

    this.getSessionValues();
    var ele = document.getElementById("mySidenavv");
    var ele1 = document.getElementById("sidebar");
    var elements = document.querySelectorAll<HTMLElement>('.he');
    if (ele != null && ele1 != null && elements != null) {
      ele.style.opacity = '1';
      ele.style.marginLeft = "0px"
      ele.style.width = "300px";
      ele.hidden = false;


      for (var i = 0; i < elements.length; i++) {
        elements[i].hidden = true;
      }




    }
  }

  closeNavv() {
    var e = document.getElementById("mySidenavv");
    var ele1 = document.getElementById("sidebar");
    var elements = document.querySelectorAll<HTMLElement>('.he');

    if (e != null && ele1 != null && elements != null) {
      e.style.opacity = '0';
      e.style.width = "0";
      e.hidden = true
      for (var i = 0; i < elements.length; i++) {
        elements[i].hidden = false;
      }

      e.style.marginLeft = "auto"


    }

  }

}
