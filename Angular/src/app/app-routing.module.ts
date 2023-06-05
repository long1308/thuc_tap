import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/Client/signup/signup.component';
import { SigninComponent } from './pages/Client/signin/signin.component';
import { NotfoundComponent } from './components/not-found/notfound.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShopComponent } from './components/shop/shop.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { ListProductComponent } from './components/Admin/product/list-product/list-product.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { ContainerComponent } from './pages/Client/container/container.component';
import { SizeComponent } from './components/Admin/size/size.component';
import { ColorComponent } from './components/Admin/color/color.component';
import { CategoyComponent } from './components/Admin/categoy/categoy.component';
import { ProductAddComponent } from './components/Admin/product/product-add/product-add.component';
import { ProductEditComponent } from './components/Admin/product/product-edit/product-edit.component';
import { SizeAddComponent } from './components/Admin/size/size-add/size-add.component';
import { SizeEditComponent } from './components/Admin/size/size-edit/size-edit.component';
import { ColorAddComponent } from './components/Admin/color/color-add/color-add.component';
import { ColorEditComponent } from './components/Admin/color/color-edit/color-edit.component';
import { CategoyAddComponent } from './components/Admin/categoy/categoy-add/categoy-add.component';
import { CategoyEditComponent } from './components/Admin/categoy/categoy-edit/categoy-edit.component';
import { ProductsOfCategoriesComponent } from './components/products-of-categories/products-of-categories.component';
import { CartsComponent } from './components/Admin/carts/carts.component';
import { AdminGuardComponent } from './guards/admin-guard/admin-guard.component';
import { AuthGuardNotLoggedComponent } from './guards/auth-guard-not-logged/auth-guard-not-logged.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: ContainerComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'cart', component: CartComponent },
      { path: 'account', component: AccountComponent },
      { path: 'category/:id', component: ProductsOfCategoriesComponent },
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuardNotLoggedComponent],
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AuthGuardNotLoggedComponent],
  },

  //admin
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [AdminGuardComponent],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ListProductComponent },
      { path: 'products/add', component: ProductAddComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'size', component: SizeComponent },
      { path: 'size/add', component: SizeAddComponent },
      { path: 'size/edit/:id', component: SizeEditComponent },
      { path: 'color', component: ColorComponent },
      { path: 'color/add', component: ColorAddComponent },
      { path: 'color/edit/:id', component: ColorEditComponent },
      { path: 'categorys', component: CategoyComponent },
      { path: 'categorys/add', component: CategoyAddComponent },
      { path: 'categorys/edit/:id', component: CategoyEditComponent },
      { path: 'cart', component: CartsComponent },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AdminGuardComponent],
  exports: [RouterModule],
})
export class AppRoutingModule {}
