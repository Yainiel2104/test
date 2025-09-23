import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../../env';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export interface ProductoInterface {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  img: string;
}

export interface ApiArrayResponse {
  data: ProductoInterface[];
}
export interface ApiObjectResponse {
  data: ProductoInterface;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosServices {
  private productsSubject = new BehaviorSubject<ProductoInterface[]>([]);
  public productos = this.productsSubject.asObservable();
  public loading = true;

  constructor(private http: HttpClient,private router: Router) {}

  fetchProductos(): Observable<ApiArrayResponse> {
    this.loading = true;
    const apiUrl = `${environment.API_URL}/productos`;
    return this.http.get<ApiArrayResponse>(apiUrl).pipe(
      tap({
        next: (productos) => {
          this.productsSubject.next(productos.data);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching products', error);
          Swal.fire({
            title: error.status == 404 ? 'Advertencia' : 'Error',
            text:
              error?.error?.data ||
              'Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte.',
            icon: error.status == 404 ? 'warning' : 'error',
          });
          this.loading = false;
        },
      })
    );
  }

  getProductoById(id: string): Observable<ApiObjectResponse> {
    return this.http.get<ApiObjectResponse>(`${environment.API_URL}/productos/${id}`).pipe(
      tap({
        next: () => {
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          if (error.status == 404 || error.status == 400) {this.router.navigate(['/'])}
          console.error('Error fetching product by ID', error);
          Swal.fire({
            title: error.status == 404 ? 'Advertencia' : 'Error',
            text:
              error?.error?.data ||
              'Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte.',
            icon: error.status == 404 ? 'warning' : 'error',
          });
        },
      })
    );
  }

  filtrarProductos(limit: string, sort: string, orden: string): Observable<ApiArrayResponse> {
    this.loading = true;
    console.log('aqui');
    return this.http
      .get<ApiArrayResponse>(
        `${environment.API_URL}/productos?limit=${limit}&sort=${sort}&orden=${orden}`
      )
      .pipe(
        tap({
          next: (response) => {
            // this.productos = response.data;
            this.productsSubject.next(response.data);
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            console.error('Error fetching products', error);
            Swal.fire({
              title: error.status == 404 ? 'Advertencia' : 'Error',
              text:
                error?.error?.data ||
                'Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte.',
              icon: error.status == 404 ? 'warning' : 'error',
            });
          },
        })
      );
  }

  search(data: { query: string; field: string }): Observable<ApiArrayResponse> {
    this.loading = true;
    return this.http
      .get<ApiArrayResponse>(
        `${environment.API_URL}/productos/search?valor=${data.query}&termino=${data.field}`
      )
      .pipe(
        tap({
          next: (response) => {
            // this.productos = response.data;
            this.productsSubject.next(response.data);
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            console.error('Error fetching products', error);
            Swal.fire({
              title: error.status == 404 ? 'Advertencia' : 'Error',
              text:
                error?.error?.data ||
                'Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte.',
              icon: error.status == 404 ? 'warning' : 'error',
            });
          },
        })
      );
  }
}
