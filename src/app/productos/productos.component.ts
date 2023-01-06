import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import {
  CategoriaControllerService,
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
  constructor(
    private _builder: FormBuilder,
    private productosService: ProductoControllerService,
    private categoriaService: CategoriaControllerService,
    private puntuacionService: PuntuacionControllerService
  ) {
    this.productForm = this._builder.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      url_imagen: new FormControl('', [Validators.required]),
    });
    this.puntuacionForm = this._builder.group({
      valoracionPrecio: new FormControl('', [Validators.required]),
      valoracionCalidad: new FormControl('', [Validators.required]),
      valoracionDiseno: new FormControl('', [Validators.required]),
      comentario: new FormControl('', Validators.required),
    });
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos() {
    this.productosService.getAllProductsUsingGET().subscribe((data: any) => {
      console.log(data);
      this.Products = data;
    });
  }
  obtenerCategorias() {
    this.categoriaService.getAllCategorysUsingGET().subscribe((data: any) => {
      console.log(data);
      this.Categoria = data;
    });
  }
  obtenerProductoPorID(id: number) {
    this.productosService.getProductByIDUsingGET(id).subscribe((data: any) => {
      console.log(data);
      this.productoPorIDBuscaso = data;
    });
  }
  obtenerPuntuacionPorIdProducto(id: number) {
    this.puntuacionService
      .getAllPuntuacionPorIDUsingGET(id)
      .subscribe((data: any) => {
        this.Puntuacion = data;
      });
  }
  ngOnInit(): void {
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
  openModalVerPuntuacion(id: any) {
    let data = this.obtenerPuntuacionPorIdProducto(id);

    console.log('modal puntuacion');

    this.formModalVerPuntuaciones.show();
  }
  enviarPuntuacion(values: any) {
    let puntuacion = {
      nivelCalidad: values.valoracionCalidad,
      nivelPrecio: values.valoracionPrecio,
      nivelDiseno: values.valoracionDiseno,
      comentario: values.comentario,
      id_producto: this.idProductoModal,
    };

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
  enviarFormProductos(values: any) {
    const now = new Date();
    let productDte = {
      fechaCreacion: now,
      nombre: values.nombre,
      descripcion: values.descripcion,
      precio: values.precio,
      urlImage: values.url_imagen,
    };
    this.productosService.createProductUsingPOST(productDte).subscribe((x) => {
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
