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
export class EquipmentService {

  private baseUrl: string;
  APIUrl = AppSettings.Current().ConnectionStrings["FileAPIURL"];

    constructor(private http: HttpClient) {
   
    }
    //Gets the list of Employees
    public getAllEquipment(): Observable<Equipment[]>{
        return this.http
            .get<Equipment[]>(`${this.APIUrl}api/Equipments`);
    }

    /**
     
    //GET specific product from the list
    public getProduct(productId: string) {
        console.log('Get Product : ' + productId);
        return this.http.get(`${this.baseUrl}GetProduct/${productId}`);

    };

    //Updates an existing Product
    public updateProduct(newProduct: Product) {
        console.log("update Product");
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8");
        //console.log('Update Employee : ' + JSON.stringify(newEmployee));
        console.log('Update Product : ' + newProduct.id);
        return this.http.put(`${this.baseUrl}UpdateProduct/${newProduct.id}`, JSON.stringify(newProduct), { headers: headers });

    };
    **/
    
}

export class Equipment {
    public eid: number = 0;
    public Rating: string = "";
    public Description: string = "";
}  

