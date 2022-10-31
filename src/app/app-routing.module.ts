import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CarteComponent } from './carte/carte.component';
import { RechercheComponent } from './recherche/recherche.component';
import { ListePaysComponent } from './liste-pays/liste-pays.component';
import { FormPaysComponent } from './form-pays/form-pays.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full' },
  {path: 'carte', component: CarteComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'recherche', component: RechercheComponent},
  {path: 'liste-pays', component: ListePaysComponent},
  {path: 'form-pays', component: FormPaysComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
