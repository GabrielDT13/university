import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  product: Product = { name: '', price: 0 };
  editMode = false;
  editId: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  async saveProduct() {
    if (this.editMode && this.editId) {
      this.productService.updateProduct(this.editId, this.product).then(() => this.resetForm());
    } else {
      await this.productService.addProduct(this.product);
      this.resetForm();
    }
  }

  editProduct(p: Product) {
    this.product = { name: p.name, price: p.price };
    this.editId = p.id!;
    this.editMode = true;
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }

  resetForm() {
    this.product = { name: '', price: 0 };
    this.editMode = false;
    this.editId = null;
  }
}
