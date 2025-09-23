import { Component, Input } from '@angular/core';
import { ProductoInterface } from '../../Services/productos-services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-prod',
  templateUrl: './card-prod.html',
  styleUrls: ['./card-prod.css'],
  imports: [RouterLink],
})
export class CardProd {
  @Input() product: ProductoInterface = {
    id: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    img: '',
  };

  truncateDescription(description: string): string {
    const maxLength = 250;
    return description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  }

  getStockPercentage(): number {
    const maxStock = 100; // Valor máximo de referencia
    return (this.product.stock / maxStock) * 100;
  }

  getStockColor(): string {
    if (this.product.stock === 0) return 'out-of-stock';
    if (this.product.stock < 10) return 'low-stock';
    if (this.product.stock < 30) return 'medium-stock';
    return 'high-stock';
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder-product.png';
  }
}
