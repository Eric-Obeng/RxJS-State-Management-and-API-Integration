import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems$ = new BehaviorSubject<Product[]>(this.loadCartItems());
  cartItems = this.cartItems$.asObservable();

  totalItems$ = new BehaviorSubject<number>(
    this.calculateTotalItems(this.cartItems$.getValue())
  );
  totalItems: Observable<number> = this.totalItems$.asObservable();

  constructor() {
    this.cartItems.subscribe((items) => {
      this.totalItems$.next(this.calculateTotalItems(items));
      this.saveCartItems(items);
    });
  }

  private loadCartItems(): Product[] {
    const storedItems = localStorage.getItem('cart');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private saveCartItems(items: Product[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const currentItem = this.cartItems$.getValue();
    const existingItem = currentItem.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      product.addToCart = true;
      product.quantity = 1;
      currentItem.push(product);
    }
    this.cartItems$.next(currentItem);
  }

  removeFromCart(productId: number) {
    const currentItem = this.cartItems$.getValue();
    this.cartItems$.next(currentItem.filter((item) => item.id !== productId));
    console.log('Deleting product with ID', productId);
  }

  clearCart() {
    this.cartItems$.next([]);
  }

  calculateTotalItems(items: Product[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }
}
