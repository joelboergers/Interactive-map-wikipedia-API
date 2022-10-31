import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarteComponent } from './carte/carte.component';
import { AuthComponent } from './auth/auth.component';
import { PaysComponent } from './pays/pays.component';
import { PaysListComponent } from './pays/pays-list/pays-list.component';
import { PaysDetailComponent } from './pays/pays-detail/pays-detail.component';
import { PaysItemComponent } from './pays/pays-list/pays-item/pays-item.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RechercheComponent } from './recherche/recherche.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { InfoPaysComponent } from './info-pays/info-pays.component';
import { WikiComponent } from './wiki/wiki.component';
import { ListePaysComponent } from './liste-pays/liste-pays.component';
import { FormPaysComponent } from './form-pays/form-pays.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CarteComponent,
    AuthComponent,
    PaysComponent,
    PaysListComponent,
    PaysDetailComponent,
    PaysItemComponent,
    HeaderComponent,
    RechercheComponent,
    InfoPaysComponent,
    WikiComponent,
    ListePaysComponent, 
    FormPaysComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CarteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
