import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../Components/footer/footer';
import { Navbar } from '../../Components/navbar/navbar';
import { CardProd } from '../../Components/card-prod/card-prod';
import { ProductoInterface, ProductosServices } from '../../Services/productos-services';
import { Loader } from '../../Components/loader/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, Navbar, Footer, CardProd, Loader, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  productos: ProductoInterface[] = [];
  loading = true;

  constructor(public productosService: ProductosServices) {}

  ngOnInit() {
    //llamo al metodo que obtiene los productos
    this.productosService.fetchProductos().subscribe();
    
    //Habilitar la deteccion de cambios en productos
    this.productosService.productos.subscribe({
      next: (products) => {
        this.productos = products;
      },
    });
  }
}
