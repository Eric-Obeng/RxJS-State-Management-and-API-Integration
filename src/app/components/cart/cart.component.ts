import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { delay, Observable, tap } from 'rxjs';
import { Product } from '../../interface/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: Product[] = [];
  totalItems: number = 0;
  showCart: boolean = false;

  showCartAfterDelay() {
    setTimeout(() => {
      this.showCart = true;
    }, 6000);
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService
      .getCartItems()
      .pipe(
        // delay(5000),
        tap(() => this.showCartAfterDelay())
      )
      .subscribe({
        next: (items) => {
          this.cartItems = items;
          this.totalItems = this.cartService.calculateTotalItems(items);
        },
        error: (error) => console.error('Error fetching cart items:', error),
      });
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
