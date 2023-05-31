import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemSearchComponent } from './item-search/item-search.component';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import { PrefUtilComponent } from './pref-util/pref-util.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfSetsComponent } from './prof-sets/prof-sets.component';


const routes: Routes = [
  { path: ':id/main-page', redirectTo: ':id/main-page/dashboard', pathMatch: 'full' },
  {
    path: ':id/main-page', component: MainPageComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'items', component: ItemsComponent },
      {path: "item/:itemid", component: ItemDetailComponent},
      { path: 'profile', component: PrefUtilComponent},
      { path: 'prof-sets/:id', component: ProfSetsComponent},
      { path: 'carrinho', component: CarrinhoComponent},
      { path: 'wishlist', component: WishlistComponent},
    ]
  },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
