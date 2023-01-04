import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriaControllerService } from '../service';
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
  formModalPuntuacion: any;
  productForm!: FormGroup;
  puntuacionForm!: FormGroup;
  formModalVerPuntuaciones:any;
  Products:any[] =[];
  Categoria:any[]=[];
  constructor(
    private _builder: FormBuilder,
    private productosService: ProductoControllerService,
    private categoriaService: CategoriaControllerService
  ) {
    this.productForm = this._builder.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      url_imagen: new FormControl('', [Validators.required]),
    });
    this.puntuacionForm= this._builder.group({
      valoracionPrecio: new FormControl('',[Validators.required]),
      valoracionCalidad: new FormControl('',[Validators.required]),
      valoracionDiseno: new FormControl('',[Validators.required]),
      comentario: new FormControl('',Validators.required)
    })
    this.obtenerProductos();
    this.obtenerCategorias();
  }
  
  obtenerProductos() {
    this.productosService.getAllProductsUsingGET().subscribe((data: any) => {
      console.log(data);
      this.Products = data;
    });
  }
  obtenerCategorias(){
    this.categoriaService.getAllCategorysUsingGET().subscribe((data:any)=>{
      console.log(data);
      this.Categoria = data;
    })
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
  openModalPuntuacion(id:any){
    
    this.formModalPuntuacion.show();
  }
  openModalVerPuntuacion(id:any){
    console.log('modal puntuacion');
    this.formModalVerPuntuaciones.show();
  }
enviarPuntuacion(values:any){
console.log(values);
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
