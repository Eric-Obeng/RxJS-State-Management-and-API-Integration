import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { Observable } from 'rxjs';
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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.totalItems = items.length;
      },
      error: (error) => console.error('Error fetching cart items:', error),
    });
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
