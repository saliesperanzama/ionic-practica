import { Component, ChangeDetectorRef } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public products: Product[]=[];
  public productsFounds: Product[]=[];
  public filter = [
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia"
  ];

  constructor(public cartService: CartService)  {
    this.products.push({
      name: "Coca Cola",
      price: 25,
      description: "lorem ipsum dolor sit amet.",
      photo: "https://picsum.photos/500/300?random=1",
      type: "Abarrotes",
      color: "primary"
    });
    this.products.push({
      name: "Aguacate",
      price: 30,
      description: "lorem ipsum dolor sit amet.",
      photo: "https://picsum.photos/500/300?random=1",
      type: "Frutas y Verduras",
      color: "secondary"
    });
    this.products.push({
      name: "Jabón Zote",
      price: 19,
      description: "lorem ipsum dolor sit amet.",
      photo: "https://picsum.photos/500/300?random=1",
      type: "Limpieza",
      color: "medium"
    });
    this.products.push({
      name: "Aspirina",
      price: 100,
      description: "lorem ipsum dolor sit amet.",
      photo: "https://picsum.photos/500/300?random=1",
      type: "Farmacia",
      color: "dark"
    });

    this.productsFounds = this.products;
    this.productsFounds = this.products;
  }

  public filterProducts ():void{
    this.productsFounds = this.products.filter((item) => {
      return this.filter.includes(item.type);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
  
  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }
}