import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { UserControllerService } from '../service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  loginForm!: FormGroup;

  constructor(private cookies: CookieService, private _builder: FormBuilder,private loginService: UserControllerService,private router: Router) {
    this.loginForm = this._builder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  enviarCredencialesLogin(values: any) {
    console.log(values );
    let user = {
      email: values.email,
       
      password: values.password,
     
       
    };
    this.loginService
    .findUserByCredencialesUsingPOST(user)
    .subscribe( data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'Operación Correcta',
          text: 'Logeado Correctamente',
        });
        this.router.navigate(['/'])
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Operación Incorrecta',
          text: 'No se encuentran coincidencias',
        });
        this.loginForm.reset();
      }
    },
    error => console.log('oops', error));
  }
  setToken(token: string) {
    this.cookies.set('statusLogin',"true");
  }
  getToken() {
    return this.cookies.get('statusLogin');
  }
}
