import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {


  constructor(public dialogRef: MatDialogRef<PostComponent>,@Inject(MAT_DIALOG_DATA) public data:{"url":string,"caption":string,"likes":string,"commment":string,"time":string,"uname":string}){
    console.log("adsfg:"+data.url);


 

  }

 date=new Date(this.data.time).toLocaleString('en-us',{month:'long', day:'numeric'})

}
