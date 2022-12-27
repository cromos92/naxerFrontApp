import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  title = 'productApp';
  products!: Producto[];
  formModal: any;
  productForm!: FormGroup;
  constructor(
    private _builder: FormBuilder,
    private productosService: ProductoControllerService
  ) {}
  ngOnInit(): void {
     this.productForm = new FormGroup({
       descripcion: new FormControl(),
     });
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalProductos')
    );
    this.productosService.getAllProductsUsingGET().subscribe((all) => {
      console.log(all);
    });
  }
  openModal() {
    this.formModal.show();
  }

}
