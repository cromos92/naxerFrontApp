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
import { ApiModule, BASE_PATH } from './service';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environment.prod.ts/environment.prod';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Select2Module } from 'ng-select2-component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ComparadorComponent,
    HomeComponent,
    VerProductoComponent,
    VerComparacionesComponent,
    ProductosComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    Select2Module,

  ],
  providers: [CookieService,{ provide: BASE_PATH, useValue: environment.basePath }],
  bootstrap: [AppComponent],
})
export class AppModule {}
