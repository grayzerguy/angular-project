import { AdminCategoryComponent } from './components/admin-area/admin-category/admin-category.component';
import { ProductFormComponent } from './components/admin-area/product-form/product-form.component';
import { AdminGuard } from './services/admin.guard';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { StoreHomeComponent } from './components/store-area/store-home/store-home.component';

// import { ProductDetailsComponent } from './components/products-area/product-details/product-details.component';

import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthGuard } from './services/auth.guard';

import { ShoppingCartComponent } from './components/shopping-area/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/shopping-area/check-out/check-out.component';
import { OrderSuccessComponent } from './components/shopping-area/order-success/order-success.component';
import { AdminProductsComponent } from './components/admin-area/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-area/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './components/shopping-area/my-orders/my-orders.component';
import { CategoryFormComponent } from './components/admin-area/category-form/category-form.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },

  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/category/:id',
    component: CategoryFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/category',
    component: AdminCategoryComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/category/new',
    component: CategoryFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
  },
  { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard] },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  // the main page
  { path: 'store', component: StoreHomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
