import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Main/navbar/navbar.component';
import { LandingPageComponent } from './Main/landing-page/landing-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GaleriaComponent } from './galeria/galeria.component';
import { PreciosComponent } from './precios/precios.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { AdmImagenesComponent } from './adm-imagenes/adm-imagenes.component';
import { AdmGaleriaComponent } from './adm-galeria/adm-galeria.component';
import { AdmDashboardComponent } from './adm-dashboard/adm-dashboard.component';
import { AdmPreciosComponent } from './adm-precios/adm-precios.component';
import { PlanesComponent } from './planes/planes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    GaleriaComponent,
    PreciosComponent,
    ContactoComponent,
    DashboardadminComponent,
    AdmImagenesComponent,
    AdmGaleriaComponent,
    AdmDashboardComponent,
    AdmPreciosComponent,
    PlanesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
