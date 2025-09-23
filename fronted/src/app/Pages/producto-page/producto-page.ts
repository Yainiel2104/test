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
  // producto: ProductoInterface[] = [];
  constructor(
    public productoService: ProductosServices,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.cargarProducto(id);
    });
  }

  cargarProducto(id: string) {
    // Usa tu servicio para cargar el producto
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

    // .subscribe(
    //   (data) => {
    //     // console.log(data.data);
    //     this.producto = data.data;
    //     console.log(this.producto);
    //   },
    //   (error) => {
    //     console.error('Error al cargar producto:', error);
    //   }
    // );
  }
}
