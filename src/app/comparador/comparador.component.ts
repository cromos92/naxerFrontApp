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
  // importo los servicion de api a utilizar en el constructor
  constructor(
    private _builder: FormBuilder,
    private productosService: ProductoControllerService,
    private puntuacionService: PuntuacionControllerService
  ) {
    //inicializo valores a utilizar en la vista html
    this.dataSelect = [];
    this.resultadoProductos = [];
    this.resultadoPuntuaciones = [];
    this.opciones = { label: "Ingresar Valor", value: "0" };
    // defino el select para cargar las opciones en la vista
    this.data1 = [
      {
        label: 'Listado Productos',
        options: [this.opciones],
      },
    ];
    //defino el formulario para comparar productos
    this.comparadorForm = this._builder.group({
      productos: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    // carga al formulario todos los productos que existen en la base de datos
    this.productosService.obtenerTodosLosProductosUsingGET().subscribe((result: any) => {
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
  // funcion para enviar el fomulario y comparar productos
  enviarFormComparador(values: any) {
    // funcion para obtener los valores promedios por los id enviados del formulario
    this.obtenerPromedioPuntuaciones(values.productos);
    // obtengo informacion de los productos enviados por formulario
    this.obtenerProductosPorID(values.productos);





  }

  // funcion para obtenes la informacion de productos por id
  obtenerProductosPorID(arrayIdsProductos: any) {
    this.resultadoProductos = [];
    // recorro los ids que estan en el arreglo para obtener informacion de cada uno mediante api get
    for (let elemento of arrayIdsProductos) {
      this.productosService
        .obtenerProductoPorIDUsingGET(elemento)
        .subscribe((data) => {
          this.resultadoProductos?.push(data);
        });

    }

    return this.resultadoProductos;
  }
  // funcion prueba para mostrar array
  mostrarArr(dataArr: any) {
    for (let data in dataArr) {
      console.log("log arr" + data);
    }
  }

  //  funcion para obtener promedio de puntuaciones mediante los id de productos que recibe de formulario
  obtenerPromedioPuntuaciones(arrayIdsProductos: any) {
    this.resultadoPuntuaciones = [];
    for (let elemento of arrayIdsProductos) {
      this.puntuacionService.obtenerPuntuacionPromediosPorIDUsingGET(elemento)
        .subscribe((data2: any) => {
          // como el resultado es string se transforma en array para utilizar los datos
          let arrResultado: any[] = data2[0].split(",");

          for (let dato in arrResultado) {
            // valido que si no tiene puntuaciones en vez de arrojar nulo sea 0
            if (arrResultado[dato] == "null") {
              arrResultado[dato] = 0;
            } else {

              arrResultado[dato] = this.redondear(arrResultado[dato]);
            }
          }
          this.resultadoPuntuaciones?.push(arrResultado);
        });
    }

    return this.resultadoPuntuaciones;
  }
  // evento change de select
  change(key: string, event: Event) {

  }
  // evento busqueda de select2
  search(text: string) {
    this.data1 = text
      ? (JSON.parse(JSON.stringify(this.data1)) as Select2Option[]).filter(
        (option) =>
          option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
      )
      : JSON.parse(JSON.stringify(this.data1));
  }
  //funcion para redondear los numeros a 2 decimales
  redondear(num: number) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }
  // funcion para actualizar select si tiene mas de 3 registros a comparar
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
