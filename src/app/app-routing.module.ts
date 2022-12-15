import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ComparadorComponent } from '../app/comparador/comparador.component';
const routes: Routes = [
{ path: '', component: AppComponent},
 {path: '/comparador', component: ComparadorComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
