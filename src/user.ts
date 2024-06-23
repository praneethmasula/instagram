import { FileHandler } from "./filehandler";

export class User{
    "id":number;
    "name":string;
    "password":string;
    "userName":string;
    "followers":number=0;
    "following":number=0;
    "phooneNumber":string;
    "files":FileHandler[]=[];
    "bio":string='';
    "isNull":string='';
    "isFollowing":string='nooo';

}