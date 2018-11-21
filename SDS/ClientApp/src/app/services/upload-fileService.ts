import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from "read-appsettings-json";
//import { SDSIdService } from '../../services/sds-idService';

@Injectable()
export class UploadFileService {
    private baseUrl: string;
    private fileName: string;
    private fileAPIURL: string = AppSettings.Current().ConnectionStrings["FileAPIURL"];
    
    constructor(private http : HttpClient) { }

    postFile(SdsId: string, fileToUpload: File) {
    const endpoint = `${this.fileAPIURL}api/UploadFile`;
    const formData: FormData = new FormData();

    formData.append('File', fileToUpload, fileToUpload.name);
    formData.append('SDSId', SdsId);
    return this.http
      .post(endpoint, formData);
    }

    deleteFile(fullFileName: string) {
        const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
        //console.log(`removeItem1:${this.fileName}`);
        this.fileName = fullFileName.replace('.', '~');
        console.log(`removeItem2:${this.fileName}`);
        return this.http.get(`${this.fileAPIURL}api/DeleteFile/${this.fileName}`, { headers: headers });
    }

}
