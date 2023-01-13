import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Select2Data,
  Select2Option,
  Select2UpdateEvent,
} from 'ng-select2-component';
import Swal from 'sweetalert2';
import {
  ProductoControllerService,
  PuntuacionControllerService,
} from '../service';
import { Opciones } from './modelos/Opciones.model';
@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css'],
})
export class ComparadorComponent implements OnInit {
  options: Select2Option | undefined;
  ProductsSelect = [];
  dataSelect: any[] | undefined;
  data1: any;
  opciones: Opciones | undefined;
  comparadorForm!: FormGroup;
  resultadoProductos: any[] | undefined;
  resultadoPuntuaciones: any[] | undefined;
  constructor(
    private _builder: FormBuilder,
    private productosService: ProductoControllerService,
    private puntuacionService: PuntuacionControllerService
  ) {
    
    this.dataSelect = [];
    this.resultadoProductos = [];
        this.resultadoPuntuaciones = [];
        this.opciones= {label:"Ingresar Valor",value:"0"} ;
    this.data1 = [
      {
        label: 'Listado Productos',
        options: [this.opciones],
      },
    ];
    this.comparadorForm = this._builder.group({
      productos: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
  
    this.productosService.getAllProductsUsingGET().subscribe((result: any) => {
      result.forEach((value: any) => {
        this.dataSelect?.push(
          (this.opciones = {
            value: value.id,
            label: value.nombre + ' ' + value.descripcion,
          })
        );
      });
      this.data1[0].options = this.dataSelect;
    });
  }
  enviarFormComparador(values: any) {
    let puntuar=this.obtenerPromedioPuntuaciones(values.productos);
    let arrProd= this.obtenerProductosPorID(values.productos);
   console.log(this.resultadoProductos);
   
   
   
   
  }

   
  obtenerProductosPorID(arrayIdsProductos:any){
    this.resultadoProductos=[];
    for (let elemento of arrayIdsProductos) {
      this.productosService
        .getProductByIDUsingGET(elemento)
        .subscribe((data) => {
          this.resultadoProductos?.push(data);
        });
      
    }
   
    return this.resultadoProductos;
  }
  mostrarArr(dataArr:any){
    for( let data in dataArr){
      console.log("log arr" +data);
    }
  }
  

  obtenerPromedioPuntuaciones(arrayIdsProductos:any){
    this.resultadoPuntuaciones=[];
    for (let elemento of arrayIdsProductos) {
      this.puntuacionService .getPuntuacionPromedioPorIDUsingGET(elemento)
      .subscribe((data2:any) => {
        
        let arrResultado:any[]=data2[0].split(",");
      
        for( let dato in arrResultado){
            
           if(arrResultado[dato]=="null"){
            arrResultado[dato]=0;
           }
        }
        this.resultadoPuntuaciones?.push(arrResultado );    
      });
    }
    
    return this.resultadoPuntuaciones;
  }
  change(key: string, event: Event) {
    
  }
  search(text: string) {
    this.data1 = text
      ? (JSON.parse(JSON.stringify(this.data1)) as Select2Option[]).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.data1));
  }
  update(key: string, event: Select2UpdateEvent<any>) {
    
    if (event.value.length > 3) {
      Swal.fire({
        icon: 'error',
        title: 'Operación Incorrecta',
        text: 'Solo es Posible Seleccionar 3 Productos Por Vez',
      });
    }
  }
}
