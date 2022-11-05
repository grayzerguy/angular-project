import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/auth-area/login/login.component';
import { StoreHomeComponent } from './components/store-area/store-home/store-home.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { BsNavbarComponent } from './components/layout-area/bs-navbar/bs-navbar.component';
import { ShoppingCartComponent } from './components/shopping-area/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/shopping-area/check-out/check-out.component';
import { OrderSuccessComponent } from './components/shopping-area/order-success/order-success.component';
import { MyOrdersComponent } from './components/shopping-area/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin-area/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-area/admin-orders/admin-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './components/admin-area/product-form/product-form.component';
import { OrdersModule } from './modules/order.modules';
import { AdminCategoryComponent } from './components/admin-area/admin-category/admin-category.component';


@NgModule({
  declarations: [
    LoginComponent,
    StoreHomeComponent,
    Page404Component,
    LayoutComponent,
    ProductListComponent,
    ProductCardComponent,
   RegisterComponent,
    LogoutComponent,
    BsNavbarComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    AdminCategoryComponent,
    AdminCategoryComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    OrdersModule
    

  ],
  // providers: [ColorsService],
  // to use service in all app
  providers: [{
    useClass: JwtInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }],

  bootstrap: [LayoutComponent]

}

)
  
export class AppModule { }
