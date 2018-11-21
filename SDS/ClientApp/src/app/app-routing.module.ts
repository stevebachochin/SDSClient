import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from "./components/products/products.component";
import { ProductComponent } from "./components/product/product.component";
//import { UploadFileComponent } from "./components/upload-file/upload-file.component";


@NgModule({
    imports: [
      RouterModule.forRoot([
        {
          path: "",
          component: ProductsComponent,
        },
        {
          path: "products",
          component: ProductsComponent,
        },
        {
          path: 'product/:id',
          component: ProductComponent,
        },

])
    ],
    exports: [
        RouterModule
    ],
    providers: [
     //   AuthService, AuthGuard
    ]
})
export class AppRoutingModule { }
