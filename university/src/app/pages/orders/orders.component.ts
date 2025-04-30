import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { Client } from '../../models/client.model';
import { Product } from '../../models/product.model';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  clients: Client[] = [];
  products: Product[] = [];
  order: Order = { clientId: '', productId: '', quantity: 1 };
  editMode = false;
  editId: string | null = null;

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(data => this.orders = data);
    this.clientService.getClients().subscribe(data => this.clients = data);
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  async saveOrder() {
    if (this.editMode && this.editId) {
      this.orderService.updateOrder(this.editId, this.order).then(() => this.resetForm());
    } else {
      await this.orderService.addOrder(this.order);
      this.resetForm();
    }
  }

  editOrder(o: Order) {
    this.order = { clientId: o.clientId, productId: o.productId, quantity: o.quantity };
    this.editId = o.id!;
    this.editMode = true;
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id);
  }

  resetForm() {
    this.order = { clientId: '', productId: '', quantity: 1 };
    this.editMode = false;
    this.editId = null;
  }

  getClientName(id: string): string {
    return this.clients.find(c => c.id === id)?.name || '';
  }

  getProductName(id: string): string {
    return this.products.find(p => p.id === id)?.name || '';
  }
}
