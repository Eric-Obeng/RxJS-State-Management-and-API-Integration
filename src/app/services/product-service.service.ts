import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apIUrl = 'assets/data.json';
  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apIUrl).pipe(
      catchError((err) => {
        console.error('API fetch failed', err);
        return of([]);
      })
    );
  }
}
