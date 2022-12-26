import { Component, OnInit } from '@angular/core';
import { ProductoControllerService } from '../service/api/productoController.service';
import { Producto } from '../service/model/producto';
import { ProductoDto } from '../service/model/productoDto';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  title ='productApp';
    products!: Producto[];
  constructor(
    private productosService: ProductoControllerService
  ){

  }
  ngOnInit(): void {
 this.productosService.getAllProductsUsingGET().subscribe(all=>{
  console.log(all);

 })
  }

}
