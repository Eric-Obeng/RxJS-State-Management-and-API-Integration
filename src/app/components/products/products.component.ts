import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { Product } from '../../interface/product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products$!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.fetchProducts();

    // this.productService.fetchProducts().subscribe({
    //   next: (products) => {
    //     this.products$ = of(products);
    //     console.log('Products:', products);
    //   },
    //   error: (error) => console.error('Error:', error),
    //   complete: () => console.log('Product fetch completed'),
    // });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
