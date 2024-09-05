import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems$ = new BehaviorSubject<Product[]>([]);
  cartItems = this.cartItems$.asObservable();

  totalItems$ = new BehaviorSubject<number>(0);
  totalItems: Observable<number> = this.totalItems$.asObservable();

  constructor() {
    this.cartItems.subscribe((items) => {
      this.totalItems$.next(items.length);
    });
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const currentItem = this.cartItems$.getValue();
    // const existingItem = currentItem.findIndex(
    //   (item) => item.id === product.id
    // );

    // if (existingItem) {
    //   currentItem[existingItem].quantity += 1;
    // } else {
    //   product.quantity = 1;
    //   currentItem.push(product);
    // }
    this.cartItems$.next([...this.cartItems$.value, product]);
  }

  removeFromCart(productId: number) {
    const currentItem = this.cartItems$.getValue();
    this.cartItems$.next(currentItem.filter((item) => item.id !== productId));
  }

  clearCart() {
    this.cartItems$.next([]);
  }
}
