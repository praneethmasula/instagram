import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { User } from 'src/user';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user:User[]=[];
  filteroptions!:Observable<User[]>;
  formscontol=new FormControl('');
  constructor(private ss:UserserviceService){
  }
  ngOnInit(): void {
   this.fetchData();
   this.filteroptions=this.formscontol.valueChanges.pipe(
    startWith(''),map(value=>this._FILTER(value || ''))
   )
  }

  searchvalue='';
  fetchData(){
    this.ss.searchValues().subscribe(d=>{
      this.user=d;
    })

  }

  private _FILTER(value:string){
    const searchvalue=value.toLocaleLowerCase();
    return this.user.filter(Option=>Option.userName.toLocaleLowerCase().includes(searchvalue));
  }

  navigate(){

  }

}
