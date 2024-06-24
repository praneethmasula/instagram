import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Friends } from 'friends';
import { Observable } from 'rxjs';
import { User } from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  getAll() {
    throw new Error('Method not implemented.');
  }
 

  id:any;
  private basicURl:string = "https://insta-p4ma.onrender.com";
  constructor(private http:HttpClient) { }


updateUSerBio(bio:string,id:number){
  return this.http.get(`${this.basicURl}/user/updateBio/${bio}/${id}`);
}

isUserNameAvailable(uname:string){
  return this.http.get(`${this.basicURl}/user/isUSerPresent/${uname}`,{responseType:'text'});
}


  saveUser(formbuilder:User){
    return this.http.post(`${this.basicURl}/user`,formbuilder,{responseType: 'text'});
  }

  updateUser(pos:FormData,id:number){
    return this.http.post(`${this.basicURl}/user/dddd/${id}`,pos,{responseType:'text'});
  }

  loginUser(uname:string,pass:string){
    return this.http.get<User>(`${this.basicURl}/user/get/${uname}/${pass}`);
  }
  getUserbyId(id:number){
    return this.http.get<any>(`${this.basicURl}/user/${id}`);
  }

  getFollowers(id:number):Observable<User[]>{
    return this.http.get<User[]>(`${this.basicURl}/user/followers/${id}`);
  }

  getFollowing(id:number){
    return this.http.get<User[]>(`${this.basicURl}/user/following/${id}`);
  }

  loggedinUSer(){
  
   return sessionStorage.getItem("uid");

  }

  acceptRequest(uid: any, fid: number) {
    return this.http.post<Friends>(`${this.basicURl}/user/acept/${uid}/d/${fid}`,[]);
  }

  loggedin(){
    return this.loggedinUSer();
  }

  searchValues(){
    return this.http.get<User[]>(`${this.basicURl}/user/all`);

  }


  sendRequest(uid:number,fid:number){
    
    
    return this.http.post<Friends>(`${this.basicURl}/user/req/${uid}/d/${fid}`,[]);
  }
  removeeeRequest(uid:number,fid:number){
    
    
    return this.http.post<Friends>(`${this.basicURl}/user/removereq/${uid}/d/${fid}`,[]);
  }

  friendStatus(uid:number,fid:number){
    return this.http.get<Friends>(`${this.basicURl}/user/isFriends/${uid}/ff/${fid}`);

  }

  getRequests(id:number){
    return this.http.get<Friends[]>(`${this.basicURl}/friends/req/${id}`);
  }
}
