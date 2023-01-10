export * from './categoriaController.service';
import { CategoriaControllerService } from './categoriaController.service';
export * from './productoController.service';
import { ProductoControllerService } from './productoController.service';
export * from './puntuacionController.service';
import { PuntuacionControllerService } from './puntuacionController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [CategoriaControllerService, ProductoControllerService, PuntuacionControllerService, UserControllerService];
