import { FileHandler } from "./filehandler";
import { User } from "./user";

export class Post{
    "id":number;
    "caption":string;
    "postedTime":Date;
    "location":string;
    "likes":number;
    "comment":string;
    "user":User;
    "noOfMins":string='';
    "files":FileHandler[]=[];
    "isliked":boolean=false;
}