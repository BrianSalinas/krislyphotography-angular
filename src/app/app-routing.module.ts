import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { LandingPageComponent } from './Main/landing-page/landing-page.component';
import { PreciosComponent } from './precios/precios.component';

const routes: Routes = [
  {
    path: "LandingPage",
    component: LandingPageComponent
  },
  {
    path: "galeria",
    component: GaleriaComponent
  },
  {
    path: "precios",
    component: PreciosComponent
  },
  {
    path: "contacto",
    component: ContactoComponent
  },
  {
    path: "adm",
    component: DashboardadminComponent
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "LandingPage"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
