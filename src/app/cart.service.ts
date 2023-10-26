import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public carrito: { [type: string]: { product: Product, quantity: number, subtotal: number } } = {};
  public carritoArray: { product: Product, quantity: number, subtotal: number }[] = [];
  public totalCompra: number = 0;

  // Define BehaviorSubjects para cartArray y totalCompra
  cartArraySubject = new BehaviorSubject(this.carritoArray);
  totalCompraSubject = new BehaviorSubject(this.totalCompra);


  constructor() { }

  addToCart(product: Product): void {
    if (this.carrito[product.type]) {
      this.carrito[product.type].quantity++;
      this.carrito[product.type].subtotal += product.price;
    } else {
      this.carrito[product.type] = { product, quantity: 1, subtotal: product.price };
    }
    
    this.totalCompra += product.price;
    
    // Actualiza carritoArray
    this.updateCartArray();
  }

  removeFromCart(product: Product): void {
    if (this.carrito[product.type]) {
      if (this.carrito[product.type].quantity > 0) {
        this.carrito[product.type].quantity--;
        this.carrito[product.type].subtotal -= product.price;
        this.totalCompra -= product.price;
      }
      if (this.carrito[product.type].quantity === 0) {
        delete this.carrito[product.type];
      }
    }

    // Actualiza carritoArray
    this.updateCartArray();
  }

  updateCartArray(): void {
    this.carritoArray = Object.values(this.carrito);
    this.cartArraySubject.next(this.carritoArray); // Notifica a los suscriptores
    this.totalCompra = this.calculateTotal();
    this.totalCompraSubject.next(this.totalCompra); // Notifica a los suscriptores
  }

  // Función para calcular el total de la compra
  calculateTotal(): number {
    let total = 0;
    for (const item of this.carritoArray) {
      total += item.subtotal;
    }
    return total;
  }

  
}
