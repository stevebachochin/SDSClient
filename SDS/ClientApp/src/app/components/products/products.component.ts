import { Component, OnInit, ViewChild, Input, ElementRef, Output } from '@angular/core';
import { ProductService, Product, ProductSearchCriteria } from '../../services/productService';
import { Location } from "@angular/common";
import { NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatSortModule, MatSortable } from '@angular/material/sort';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { tap, map, filter, scan, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator'
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { EventEmitter } from 'events';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';


//upload-file.service
@Component({
  selector: 'products',
  providers: [ProductService],
  //providers: [ProductService, PaginationService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  resourceLoaded: boolean;
  productSelector: any;
  products2: any;
  products: any;
  showEditor = true;
  myName: string = "";
  product: Product;
  querySearchName: string;
  querySearch: string;

  dataSource = new BehaviorSubject<Product[]>([]);
  //ANGULAR MATERIAL
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @Input() totalCount: number;

  @Output() onPageSwitch = new EventEmitter();

  displayedColumns = ['Product1', 'Manufacturer', 'ManufacturerNo', 'MaterialNumber', 'Health', 'Flammibility', 'Reactive', 'Protection', 'DateRevision', 'deletebutton'];

  constructor(private route: ActivatedRoute, public router: Router, private zone: NgZone, private dataService: ProductService, private location: Location) {
    this.product = new Product();

  }

  // if you want to debug info  just uncomment the console.log lines.  
  ngOnInit() {
    this.querySearchName = "Product1";
    this.querySearch = "";
    this.resourceLoaded = true;
    this.productSelector = this.route.snapshot.data["productSelector"];
    this.getProducts(1, 5, "asc", "Product1","","");
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(
      () => {
        this.paginator.pageIndex = 0;
        this.getProducts(1, this.paginator.pageSize, this.sort.direction, this.sort.active, this.querySearchName, this.querySearch);
        
      }

    );



  }
  


  getProducts(pageNumber: number, pageSize: number, sortOrder: string, columnName: string, querySearchName: string, querySearch: string) {

    this.dataService.findProducts(pageNumber, pageSize, sortOrder, columnName, querySearchName, querySearch)
      .subscribe(
      (data: any) => {
        this.dataSource.next(data.body);
        this.totalCount = JSON.parse(data.headers.get('Paging-Headers')).totalCount;
        this.resourceLoaded = false;
        console.log("GOT DATA" + this.totalCount);
      }
      );
  }


  onRowClicked(row) {
    console.log('Row clicked: ', row.id);
    this.router.navigate(['/product/' + row.id]);
  }

  public deleteProduct(productId: number) {
    if (confirm("Confirm deletion?")) {
      this.dataService.removeItem(productId).subscribe(response => {
      }, error => console.log('Could not delete Product.' + productId));
      location.reload();
    }
  }   

  public paging(event: PageEvent) {
    //console.log(this.querySearchName + '--------------------------->' + this.querySearch);
    this.getProducts(event.pageIndex + 1, event.pageSize, this.sort.direction, this.sort.active, this.querySearchName, this.querySearch);
  }



  public searchProducts(querySearchName, querySearch) {
    if (querySearchName != null && querySearch != null) {
      //console.log("X"+this.querySearchName + '--------------------------->' + this.querySearch+"X");
      this.querySearchName = querySearchName;
      this.querySearch = querySearch;
      this.paginator.pageIndex = 0;
    }
    this.getProducts(this.paginator.pageIndex, this.paginator.pageSize, this.sort.direction, this.sort.active, querySearchName, querySearch);
   
  }
  /**Clear search field  **/

  public clearSearch() {
    this.querySearchName = "Product1";
    this.querySearch = "";
    this.paginator.pageIndex = 0;
    this.getProducts(1, this.paginator.pageSize, this.sort.direction, this.sort.active, this.querySearchName, this.querySearch);
  }


}



