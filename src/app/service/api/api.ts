export * from './categoriaController.service';
import { CategoriaControllerService } from './categoriaController.service';
export * from './productoController.service';
import { ProductoControllerService } from './productoController.service';
export const APIS = [CategoriaControllerService, ProductoControllerService];
