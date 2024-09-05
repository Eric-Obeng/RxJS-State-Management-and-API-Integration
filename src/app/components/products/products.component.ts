import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { Product } from '../../interface/product';
import { delay, finalize, Observable, tap } from 'rxjs';
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
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.fetchProducts().pipe(
      delay(2000),
      tap(() => {
        console.log('Setting isLoading to false');
      }),
      finalize(() => {
        console.log('Setting isLoading to false in finalize');
        this.isLoading = false;
        this.cd.detectChanges();
      })
    );

    this.products$.subscribe({
      next: (products) => console.log('Products received:', products),
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Product fetch completed'),
    });

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
