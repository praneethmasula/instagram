import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  id:any;
  private basicURl:string = "http://localhost:8080";
  constructor(private http:HttpClient) { }


  saveUser(formbuilder:User){
    return this.http.post(`${this.basicURl}/user`,formbuilder,{responseType: 'text'});
  }

  loginUser(uname:string,pass:string){
    return this.http.get<User>(`${this.basicURl}/user/get/${uname}/${pass}`);
  }
  getUserbyId(id:number){
    return this.http.get<User>(`${this.basicURl}/user/${id}`);
  }

  loggedinUSer(){
  
   return sessionStorage.getItem("uid");

  }

  loggedin(){
    return this.id;
  }

  searchValues(){
    return this.http.get<User[]>(`${this.basicURl}/user/all`);

  }
}
