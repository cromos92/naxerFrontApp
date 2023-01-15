import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { UserControllerService } from '../service';
import { Router } from '@angular/router';
import { data } from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  loginForm!: FormGroup;

  constructor(private cookies: CookieService, private _builder: FormBuilder, private loginService: UserControllerService, private router: Router) {
    this.loginForm = this._builder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  // funcion para enviar credenciales 
  enviarCredencialesLogin(values: any) {
    console.log(values);
    let user = {
      email: values.email,

      password: values.password,


    };
    this.loginService
      .buscarCredencialesUsuarioUsingPOST(user)
      .subscribe((data: any) => {
        // si arroja true quiere decir que el login esta correcto y navega al inicio
        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Operación Correcta',
            text: 'Logeado Correctamente',
          });
          this.router.navigate(['/'])
        } else {
          // sino se resetea el formulario con su alerta
          Swal.fire({
            icon: 'error',
            title: 'Operación Incorrecta',
            text: 'No se encuentran coincidencias',
          });
          this.loginForm.reset();
        }
      },
        (error: any) => console.log('oops', error));
  }
  // funcion para crear un token si el login esta correcto
  setToken(token: string) {
    this.cookies.set('statusLogin', "true");
  }
  // funcion para obtener el token
  getToken() {
    return this.cookies.get('statusLogin');
  }
}
