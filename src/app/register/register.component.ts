import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserControllerService } from '../service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrarForm!: FormGroup;
  

  constructor(
    private _builder: FormBuilder ,private loginService: UserControllerService,private router: Router,
  ) {
    this.registrarForm = this._builder.group({
      nombreRegister: new FormControl('', [Validators.required]),
      emailRegister: new FormControl('', [Validators.required]),
      passwordRegister: new FormControl('', [Validators.required]),  
    });
    
  }
  registrarUsuario(values:any){
  console.log(values);
  
    console.log(values );
    let user = {
      nombre: values.nombreRegister,
      email: values.emailRegister,
       
      password: values.passwordRegister,
     
       
    };
    this.loginService
    .createUserUsingPOST(user)
    .subscribe( data =>{
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'Operación Correcta',
          text: 'Usuario Creado Correctamente',
        });
        this.router.navigate(['/login'])

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Operación Incorrecta',
          text: 'Email ya Existe',
        });
        this.registrarForm.reset();
      }
    },
    error => console.log('oops', error));
 
  }
}

