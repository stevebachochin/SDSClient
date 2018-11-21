import { Injectable, Inject } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppSettings } from "read-appsettings-json";
import { map } from "rxjs/internal/operators/map";
import { tap } from "rxjs/internal/operators/tap";
import { TagContentType } from "@angular/compiler";

@Injectable()
export class ProductService {
  [x: string]: any;
  private baseUrl: string;
  private wastouched: boolean = true;
  private products: any;

    formWasTouched(formresult: boolean) {
        return formresult;
    }

  constructor(private http: HttpClient) {
   
  }

  ApiUrl: string = AppSettings.Current().ConnectionStrings["FileAPIURL"];
  //ApiUrl: string = 'http://uskenappdev01:8030/api/';

  //Gets the list of Employees
  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.ApiUrl}api/Products`)

  }
 /**
  * 
  * @param pageNumber
  * @param pageSize
  * @param sortOrder
  * @param columnName
  * @param querySearch      SEARCH TEXT
  * @param querySearchName  WHAT FIELD IS THE SEARCH ON
  */
  public findProducts(pageNumber: number, pageSize: number, sortOrder: string, columnName: string, querySearchName: string, querySearch: string): Observable<any> {
    if (querySearchName != null && querySearch != null && querySearchName != "" && querySearch != "") {
      let httpParams = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortOrder', sortOrder.toString())
        .set('columnName', columnName.toString())
        .set('querySearchName', querySearchName.toString())
        .set('querySearch', querySearch.toString())
      return this.http.get<any>(`${this.ApiUrl}api/Products`, {
        params: httpParams,
        observe: 'response',
        responseType: 'json'
      }
      )
    } else {

      let httpParams = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortOrder', sortOrder.toString())
        .set('columnName', columnName.toString())
        .set('querySearchName', querySearchName.toString())
        .set('querySearch', querySearch.toString())
      return this.http.get<any>(`${this.ApiUrl}api/Products`, {
        params: httpParams,
        observe: 'response',
        responseType: 'json'
      }
      )
    }

  }
  

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

    //GET specific product from the list
    public getProduct(productId: string) {
        console.log('Get Product : ' + productId);
      return this.http.get(`${this.ApiUrl}api/Products/${productId}`);

    };

    //Updates an existing Product
    public updateProduct(newProduct: Product) {
      console.log("update Product");
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json; charset=utf-8");
      return this.http.put(`${this.ApiUrl}api/Products/${newProduct.id}`, JSON.stringify(newProduct), { headers: headers });
  };

    //CREATES A NEW PRODUCT RECORD
    public addProduct(product: Product) {
        console.log("add Product");
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8");
        console.log('added Product : ' + JSON.stringify(product));
      return this.http.post(`${this.ApiUrl}api/Products/`, JSON.stringify(product), { headers: headers });

    };



    //removes an existing Product
    public removeItem(productId: number) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8");
        console.log("removeItem:" + productId);
      return this.http.delete(`${this.ApiUrl}api/Products/${productId}`, { headers: headers });

    }          

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }


    
}

export class ProductSearchCriteria{
    sortColumn: string;
    sortDirection: string;
}

export class Product {
    public id: number = 0;
    public Product1: string = "";
    public CommonName: string = "";
    public Manufacturer: string = "";
    public ManufacturerNo: string = "";
    public MaterialNumber: string = "";
    public DateRevision: Date | undefined;
    public DateReviewed: Date | undefined;
    public Health: string = "";
    public Flammibility: string = "";
    public Reactive: string = "";
    public Protection: string = "";
    public WebSite: string = "";
    public Locations: string = "";
    public CompaniesRelated: string = "";
    public Comments: string = "";
    public Sdsid: string = "";
}


