import { FileHandler } from "src/filehandler";

export class Message {
    "from": string;
    "message": string;
   "name":string;
   "to":string;
   "files":FileHandler[]=[];
    constructor() {

    }
}