import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public carritoArray: { product: Product, quantity: number, subtotal: number }[] = [];
  public totalCompra: number = 0;

  constructor(public cartService: CartService) {
    // Suscríbete a los cambios en el carritoArray y totalCompra
    this.cartService.cartArraySubject.subscribe((cartArray) => {
      this.carritoArray = cartArray;
    });

    this.cartService.totalCompraSubject.subscribe((totalCompra) => {
      this.totalCompra = totalCompra;
    });
  }

  // Función para quitar un producto del carrito
  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product); // Usa la función del servicio para quitar el producto
  }
}
