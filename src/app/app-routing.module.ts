import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ComparadorComponent } from './comparador/comparador.component';
import { HomeComponent } from './home/home.component';
import { VerComparacionesComponent } from './ver-comparaciones/ver-comparaciones.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
const routes: Routes = [
{ path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
 {path: 'comparador', component: ComparadorComponent},
 {path: 'ver_productos', component: VerProductoComponent},
 {path: 'ver_comparaciones', component: VerComparacionesComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
