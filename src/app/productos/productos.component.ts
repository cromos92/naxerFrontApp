import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  title = 'productApp';

  formModal: any;
  productForm!: FormGroup;
  Products:any[] =[];

  constructor(
    private _builder: FormBuilder,
    private productosService: ProductoControllerService
  ) {
    this.productForm = this._builder.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      url_imagen: new FormControl('', [Validators.required]),
    });
    this.obtenerProductos();
  }
  obtenerProductos() {
    this.productosService.getAllProductsUsingGET().subscribe((data: any) => {
      console.log(data);
      this.Products = data;
    });
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalProductos')
    );
  }
  openModal() {
    this.formModal.show();
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
      console.log(x);
    });
    console.log(values);
  }
}
