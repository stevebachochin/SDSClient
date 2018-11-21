import { Injectable, Inject } from "@angular/core";
import { Response, Headers } from "@angular/http";
//import "rxjs/add/operator/map";
//import 'rxjs/add/operator/do';  // debug  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from "read-appsettings-json";

@Injectable()
export class FileListService {
  private baseUrl: string;
  APIUrl = AppSettings.Current().ConnectionStrings["FileAPIURL"];

    constructor(private http: HttpClient) {
   
    }
    //Gets the list of Files
    public getAllFiles(): Observable<File[]>{
        return this.http
          .get<File[]>(`${this.APIUrl}api/Files`);
    }

    //removes an existing File 
    public removeItem(fileId: string) { 
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8");
        console.log("removeItem:" + fileId);
      //return this.http.delete(`${this.APIUrl}api/DeleteFile/${fileId}`, { headers: headers });
      this.http.delete(`${this.APIUrl}api/DeleteFile/${fileId}`, { headers: headers });
      return this.http.delete(`${this.APIUrl}api/Files/${fileId}`, { headers: headers });
    }          

  /**
      //removes an existing Product
    public removeItem(productId: number) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8");
        console.log("removeItem:" + productId);
      return this.http.delete(`${this.ApiUrl}api/Products/${productId}`, { headers: headers });

    }
**/
}

export class File {
    public fid: number = 0;
    public Filename: string = "";
    public Sdsfid: string = "";
}  

