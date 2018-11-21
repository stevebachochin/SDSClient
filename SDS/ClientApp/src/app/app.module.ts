import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
//import { AppErrorHandler } from './app-error.handler';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/productService';
//import { Sorter } from './services/sorter';
//import { SortableColumnService } from './services/sortablecolumnService';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { AppRoutingModule } from './app-routing.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HazardService } from './services/hazardService';
import { EquipmentService } from './services/equipmentService';
import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatProgressBarModule
} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProductsComponent,
    ProductComponent,
    UploadFileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  //exports: [UploadFileComponent],
  providers: [
   //{ provide: 'BASE_URL', useFactory: getBaseUrl },
   // { provide: ErrorHandler, useClass: AppErrorHandler },
    ProductService,
    EquipmentService,
    HazardService,
    //Sorter,
   // SortableColumnService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//export function getBaseUrl() {
//  return document.getElementsByTagName('base')[0].href;
//}
