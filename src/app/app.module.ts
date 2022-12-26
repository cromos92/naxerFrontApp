import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ComparadorComponent } from './comparador/comparador.component';
import { HomeComponent } from './home/home.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { VerComparacionesComponent } from './ver-comparaciones/ver-comparaciones.component';
import {  ApiModule, BASE_PATH    } from './service';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environment.prod.ts/environment.prod';
import { ProductosComponent } from './productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ComparadorComponent,
    HomeComponent,
    VerProductoComponent,
    VerComparacionesComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    HttpClientModule,
  ],
  providers: [
    { provide:BASE_PATH , useValue:environment.basePath}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
