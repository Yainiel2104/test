import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../Components/navbar/navbar';
import { Footer } from '../../Components/footer/footer';
import { ProductoInterface, ProductosServices } from '../../Services/productos-services';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '../../Components/loader/loader';
import { tap } from 'rxjs';

@Component({
  selector: 'app-producto-page',
  imports: [Navbar, Footer, Loader],
  templateUrl: './producto-page.html',
  styleUrl: './producto-page.css',
})
export class ProductoPage implements OnInit {
  producto: ProductoInterface = {
    id: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    img: '',
  };

  constructor(
    public productoService: ProductosServices,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.cargarProducto(id);
    });
  }

  cargarProducto(id: string) {
    this.productoService
      .getProductoById(id)
      .pipe(
        tap({
          next: (response) => {
            console.log(response)
            this.producto = response.data;
          }
        })
      ).subscribe();
  }
}
