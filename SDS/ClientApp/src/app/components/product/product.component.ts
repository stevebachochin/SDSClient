import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
//import 'rxjs/add/operator/catch';
import { ProductService, Product } from '../../services/productService';
import { EquipmentService, Equipment } from '../../services/equipmentService';
import { HazardService, Hazard } from '../../services/hazardService';
//import { SDSIdService } from '../services/sds-idService';
//import { Observable } from "rxjs/Observable";
import { Location } from "@angular/common";
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileListService } from '../../services/fileListService';
import { Observable } from 'rxjs';
import { AppSettings } from "read-appsettings-json";
import { UploadFileService } from '../../services/upload-fileService';
//import { DialogService } from '../services/dialog.service';


@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
  providers: [ProductService, FileListService, UploadFileService],
    //changeDetection: ChangeDetectionStrategy.Default providers: [UploadFileService]
})
export class ProductComponent implements OnInit {
    model: any;
  //  form!: FormGroup;
    files: any[] | undefined;
    Sdsid: string = "passing ssid - THIS WORKED";
    editable: boolean = false;
    submitted: boolean = true;
    wastouched: boolean = true;
    myName: string = "";
    product: any;
    id: any;
    paramid: any;
   // prod: Product;
    products: Observable<Object> | undefined;
    hazards: Observable<Object> | undefined;
    equipments: Observable<Object> | undefined;

    healthlist: any[] | undefined;
    flammablelist: any[] | undefined;
    reactivelist: any[] | undefined;

    navigationSubscription: any;
    fileAPIURL: string = "";

    constructor(
        private zone: NgZone,
        private dataService: ProductService,
        //private sdsIdService: SDSIdService,
        private equipmentService: EquipmentService,
        private hazardService: HazardService,
        private location: Location,
        private route: ActivatedRoute,
        private fileListService: FileListService,
        private fileUploadService: UploadFileService,
        private router: Router) {
        /**below is used for set up an empty form**/
        this.product = new Product();

        }


    // if you want to debug info  just uncomment the console.log lines.  
    ngOnInit() {

        //USE route.params.subscribe to detect parameter changes
        this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getProductInit(id);
            }
        );
        this.editable = true;
        this.fileAPIURL = AppSettings.Current().ConnectionStrings["FileAPIURL"];
        //this.fileAPIURL = "";

    }


    //GET THE FORM DATA
    getProductInit(prodid:string): void {

       //this.id = this.route.snapshot.paramMap.get('id');
        this.id = prodid;

        if (this.id == "new") {
            //clears any previous values
            this.product = new Product();
            this.editable = true;
            this.submitted = false;
            this.product.Sdsid = Date.now();
            // console.log('New Product - this id = ' + this.id);
        } else {


            // 
            this.dataService.getProduct(this.id)
                .subscribe(data => {
                    this.product = data;
                    console.log("SDSid#--" + this.product.Sdsid);
                   // if (this.product.Sdsid == null) { 
                   //     this.product.Sdsid = this.product.id;
                   // }
                  
                    this.fileListService.getAllFiles().subscribe(data => {
                        this.files = data.filter(data => data.Sdsfid == this.product.Sdsid);
                    });
                    
                });
    

        }

        this.equipments = this.equipmentService.getAllEquipment();
        this.hazards = this.hazardService.getAllHazards();
        this.hazardService.getAllHazards().subscribe(data => {
            this.healthlist = data.filter(data => data.Classification === 'Health');
            this.flammablelist = data.filter(data => data.Classification === 'Flammability');
            this.reactivelist = data.filter(data => data.Classification === 'Reactivity')
        })


    }

    //UPDATE EXISTING PRODUCT
    public updateProduct(item: Product) {
        if (this.id == "new") {
            //ADD A PRODUCT
            let productId = this.dataService.addProduct(this.product)
                .subscribe((data: any) => {
                    this.zone.run(() => {
                        console.log('force update the screen');
                        location.reload();
                    });
                }, error => console.log('Could not create Product.'));
            
            this.router.navigate(['../products']);

        } else {
            //MODIFY A PRODUCT
            this.dataService.updateProduct(item)
                .subscribe(
                    (data: any) => {
                        // alert(`${item.empName} was updated`);
                        this.submitted = true;
                        ////this.editable = false;
                        this.editable = true;
                    }, error => console.log('Could not update Product.'));
        }
    }



    //DETERMINES IF FORM HAS BEEN TOUCHED
    canDeactivate(): Observable<boolean> | boolean {
       
     ////   if (this.submitted == true || this.editable == false || this.wastouched == false) { return true; }
     ////   this.submitted = false;
        return confirm('Discard changes?');
    }

//Example of calling a common method in a service

   formTouched(formresult: boolean) {
   ////     this.wastouched = this.dataService.formWasTouched(formresult)
    }


    /**call service to delete a file**/
    /**
    public deleteFile(fileName: string) {
        if (confirm("Confirm deletion?")) {
            this.fileUploadService.deleteFile(fileName).subscribe(response => {
                console.log('target file.' + fileName);
                this.fileListService.getAllFiles().subscribe(data => {
                    this.files = data.filter(data => data.sdsfid == this.product.sdsid);
                });
            }, error => console.log('Could not delete Product.' + fileName + 'XXXXX'));
            //location.reload();
        }
    }  
    **/



}  



