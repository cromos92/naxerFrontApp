import { Component, OnInit } from '@angular/core';
import { Select2Data, Select2Option, Select2UpdateEvent } from 'ng-select2-component';
import Swal from 'sweetalert2';
import { ProductoControllerService } from '../service';
import {Opciones} from './modelos/Opciones.model';
@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css'],
})
export class ComparadorComponent implements OnInit {
  options: Select2Option | undefined;
  ProductsSelect=[];
  dataSelect: any[] | undefined;
  data1:any;
   opciones:Opciones | undefined;
  constructor( private productosService: ProductoControllerService){
    this.opciones={ value: 'AK', label: 'Alaska' };
   this.dataSelect=[ 
    ];
    this.data1= [
      {
          label: 'Alaskan/wwwwme Zone',
          options: [
              this.opciones
             
          ],
      },
      
  ];
  }
  ngOnInit(): void {
    console.log('ini');
    
 
  console.log(this.data1);
    this.productosService.getAllProductsUsingGET().subscribe((result: any) => {
 
      result.forEach( (value: any) => {
        this.dataSelect?.push(this.opciones={
          value:value.nombre,label:
          value.id
         }) ;
        console.log(this.opciones);
      }); 
     this.data1[0].options=this.dataSelect;
    console.log("later");
    console.log(this.data1);
    
   
  })
  
}
   

  change(key: string, event: Event) {

    console.log(key, "dd" +event);

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

    console.log(event.value);
    if(event.value.length > 3) {
  Swal.fire({
    icon: 'error',
    title: 'Operación Incorrecta',
    text: 'Solo es Posible Seleccionar 3 Productos Por Vez',
  });

    }
  }


}
