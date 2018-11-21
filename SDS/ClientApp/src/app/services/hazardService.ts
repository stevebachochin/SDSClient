import { Injectable, Inject } from "@angular/core";
import { Response, Headers } from "@angular/http";
//import "rxjs/add/operator/map";
//import 'rxjs/add/operator/do';  // debug  
//import { Observable } from "rxjs/Observable";
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from "read-appsettings-json";

@Injectable()
export class HazardService {
    private baseUrl: string;
 
  APIUrl = AppSettings.Current().ConnectionStrings["FileAPIURL"];

    constructor(private http: HttpClient) {
        
    }
    //Gets the list of Harzards
    public getAllHazards(): Observable<Hazard[]>{
        return this.http
            .get<Hazard[]>(`${this.APIUrl}api/Hazards`);
    }


}

export class Hazard {
    public hid: number = 0;
    public Classification: string = "";
    public Name: string = "";
    public Rating: string = "";
    public Description: string = "";
}  

