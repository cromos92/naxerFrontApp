import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import {
  CategoriaControllerService,
  Puntuacion,
  PuntuacionControllerService,
} from '../service';
import { ProductoControllerService } from '../service/api/productoController.service';
import { Producto } from '../service/model/producto';
import { ProductoDto } from '../service/model/productoDto';
declare var window: any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  pageActual: number = 1;
  idProductoModal: Number | undefined;
  title = 'productApp';
  formModal: any;
  formModalPuntuacion: any;
  productForm!: FormGroup;
  puntuacionForm!: FormGroup;
  formModalVerPuntuaciones: any;
  Products: any[] = [];
  Categoria: any[] = [];
  Puntuacion: any[] = [];
  productoPorIDBuscaso: Producto[] = [];

  cookies: any;
  constructor(
    private _builder: FormBuilder,
    private productosService: ProductoControllerService,
    private categoriaService: CategoriaControllerService,
    private puntuacionService: PuntuacionControllerService
  ) {
    // declaro formulario creacion de productos
    this.productForm = this._builder.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      url_imagen: new FormControl('', [Validators.required]),
    });
    // formulario de creacion de puntuaciones
    this.puntuacionForm = this._builder.group({
      valoracionPrecio: new FormControl('', [Validators.required]),
      valoracionCalidad: new FormControl('', [Validators.required]),
      valoracionDiseno: new FormControl('', [Validators.required]),
      comentario: new FormControl('', Validators.required),
    });
    this.obtenerProductos();
    this.obtenerCategorias();
  }
  // funcion para obtener todos los productos del api
  obtenerProductos() {
    this.productosService.obtenerTodosLosProductosUsingGET().subscribe((data: any) => {
      console.log(data);
      this.Products = data;
    });
  }
  // funcion para obtener todas las categorias
  obtenerCategorias() {
    this.categoriaService.obtenerTodasLasCategoriasUsingGET().subscribe((data: any) => {
      console.log(data);
      this.Categoria = data;
    });
  }
  // funcion para obtener producto en especifico por id
  obtenerProductoPorID(id: number) {
    this.productosService.obtenerProductoPorIDUsingGET(id).subscribe((data: any) => {
      console.log(data);
      this.productoPorIDBuscaso = data;
    });
  }
  // funcion para obtener todas las puntuaciones de un producto
  obtenerPuntuacionPorIdProducto(id: any) {
    this.puntuacionService
      .obtenerPuntuacionesPorIdProductoUsingGET(id)
      .subscribe((data: any) => {
        console.log(data);

        this.Puntuacion = data;
      });
  }
  ngOnInit(): void {
    // declaro los modales del bootstrap para su uso
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalProductos')
    );
    this.formModalPuntuacion = new window.bootstrap.Modal(
      document.getElementById('formModalPuntuacion')
    );
    this.formModalVerPuntuaciones = new window.bootstrap.Modal(
      document.getElementById('verPuntuaciones')
    );
  }
  openModal() {
    this.formModal.show();
  }
  openModalPuntuacion(id: any) {
    console.log(id);
    this.idProductoModal = id;
    this.formModalPuntuacion.show();
  }
  // modal para ver puntuaciones de un producto
  openModalVerPuntuacion(id: any) {
    this.obtenerPuntuacionPorIdProducto(id);
    this.formModalVerPuntuaciones.show();
  }
  // funcion para enviar formulario de puntuaciones y crearla
  enviarPuntuacion(values: any) {
    let puntuacion = {
      nivelCalidad: values.valoracionCalidad,
      nivelPrecio: values.valoracionPrecio,
      nivelDiseno: values.valoracionDiseno,
      comentario: values.comentario,
      id_producto: this.idProductoModal,
    };
    // metodo para crear puntuacion
    this.puntuacionService
      .crearPuntuacionUsingPOST(puntuacion)
      .subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Operación Correcta',
          text: 'Producto Punteado Correctamente',
        });
        this.puntuacionForm.reset();
        this.formModalPuntuacion.hide();
      });
  }
  // eliminar puntuaciones por id
  eliminarPuntuacionPorID(id: number) {
    console.log(id);
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Accion Irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // si se acepta eliminar
      if (result.isConfirmed) {
        Swal.fire(
          'Puntuacion Eliminada!',
          'Your file has been deleted.',
          'success'
        )
        let idProducto: number | undefined = 0;
        //funcion para eliminar puntuaciones por id
        this.puntuacionService
          .eliminarPuntuacionesPorIDUsingDELETE(id)
          .subscribe((data_) => {
            this.formModalVerPuntuaciones.hide();
          });
      }
    });
  }
  // funcion para eliminar producto
  eliminarProducto(id: any) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Accion Irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Producto Eliminado!',
          'Your file has been deleted.',
          'success'
        )
        // elimino el producto por id
        this.productosService.eliminarProductoPorIDUsingDELETE(id).subscribe((data) => {
          console.log(data);
          this.obtenerProductos();
        })
        // elimino todas las puntuaciones asociadas a ese producto
        this.puntuacionService.eliminarPuntuacionesProductosPorIdProductosUsingDELETE(id).subscribe((data) => {
          console.log("puntuaciones Eliminadas");
        });

      }
    });
  }
  // formulario de creacion de productos
  enviarFormProductos(values: any) {
    const now = new Date();
    let productDte = {
      fechaCreacion: now,
      nombre: values.nombre,
      descripcion: values.descripcion,
      precio: values.precio,
      urlImage: values.url_imagen,
    };
    this.productosService.crearProductoUsingPOST(productDte).subscribe((x: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Operación Correcta',
        text: 'Producto Creado Correctamente',
      });
      this.obtenerProductos();
      this.productForm.reset();
      this.formModal.hide();
    });
  }
}
