import { ContentType } from "../enums/content-type";

export class FileInfo{
    fileName:string;
    url:string;
    contentType:ContentType;
    constructor(){
        this.fileName='';
        this.url='';
        this.contentType=ContentType.OTHER;
    }
}


