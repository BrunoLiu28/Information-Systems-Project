import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainPageComponent } from './main-page/main-page.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { PrefUtilComponent } from './pref-util/pref-util.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfSetsComponent } from './prof-sets/prof-sets.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemSearchComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    MainPageComponent,
    ItemsComponent,
    ItemDetailComponent,
    PrefUtilComponent,
    CarrinhoComponent,
    WishlistComponent,
    ProfSetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
