import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/post';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  private basicURl:string = "http://localhost:8080/post";
  constructor(private http:HttpClient) { }

  savePsot(pos:FormData,id:number){
   return  this.http.post(`${this.basicURl}/${id}`,pos);
  }

  getPostsByUSerId(id:number){
    return this.http.get<Post[]>(`${this.basicURl}/${id}`);
  }

  getPostOfOwn(id:number){
    return this.http.get<Post[]>(`${this.basicURl}/posts/${id}`)
  }
}
