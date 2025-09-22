import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProductosServices } from '../../Services/productos-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  // standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  searchForm: FormGroup;
  isMobile: boolean = false;
  menuOpen: boolean = false;

  sort: string = 'nombre';
  limit: string = 'todos';
  orden: string = 'desc';

  isSearching: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private productosService: ProductosServices,
    private router:Router,
  ) {
    this.searchForm = this.fb.group({
      field: ['nombre', Validators.required],
      query: ['', Validators.required],
    });

    // Detectar cambios en el tamaño de pantalla:cite[3]:cite[7]
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  onSearch() {
    if (this.searchForm.valid) {
      const searchData = this.searchForm.value;
      console.log('Buscando:', searchData);
      this.productosService.search(searchData).subscribe();
      this.isSearching = true;
    }
  }

  onClearSearch() {
    this.productosService.fetchProductos().subscribe();
    this.isSearching = false;
  }

  goBack() {
    window.history.back();
  }

  get isRoot(): boolean {
    return this.router.url === '/';
  }

  setSort(field: string | Event) {
    const safeField = typeof field === 'string' ? field : (field.target as HTMLSelectElement).value;
    console.log('Ordenar por:', safeField);
    this.sort = safeField;
  }

  setOrder(order: string | Event) {
    const safeOrder = typeof order === 'string' ? order : (order.target as HTMLSelectElement).value;
    console.log('Orden:', safeOrder);
    this.orden = safeOrder;
  }

  setLimit(limit: string | Event) {
    const safeLimit = typeof limit === 'string' ? limit : (limit.target as HTMLSelectElement).value;
    this.limit = safeLimit;
    console.log('Límite:', safeLimit);
  }

  filtrar(): void {
    this.productosService.filtrarProductos(this.limit, this.sort, this.orden).subscribe();
  }
}
