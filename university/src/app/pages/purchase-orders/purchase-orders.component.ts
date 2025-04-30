import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { Supplier } from '../../models/supplier.model';
import { Product } from '../../models/product.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { SupplierService } from '../../services/supplier.service';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  suppliers: Supplier[] = [];
  products: Product[] = [];
  po: PurchaseOrder = { supplierId: '', productId: '', quantity: 1 };
  editMode = false;
  editId: string | null = null;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private supplierService: SupplierService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.purchaseOrderService.getPurchaseOrders().subscribe(data => this.purchaseOrders = data);
    this.supplierService.getSuppliers().subscribe(data => this.suppliers = data);
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  async savePurchaseOrder() {
    if (this.editMode && this.editId) {
      this.purchaseOrderService.updatePurchaseOrder(this.editId, this.po).then(() => this.resetForm());
    } else {
      await this.purchaseOrderService.addPurchaseOrder(this.po);
      this.resetForm();
    }
  }

  editPurchaseOrder(po: PurchaseOrder) {
    this.po = { supplierId: po.supplierId, productId: po.productId, quantity: po.quantity };
    this.editId = po.id!;
    this.editMode = true;
  }

  deletePurchaseOrder(id: string) {
    this.purchaseOrderService.deletePurchaseOrder(id);
  }

  resetForm() {
    this.po = { supplierId: '', productId: '', quantity: 1 };
    this.editMode = false;
    this.editId = null;
  }

  getSupplierName(id: string): string {
    return this.suppliers.find(s => s.id === id)?.name || '';
  }

  getProductName(id: string): string {
    return this.products.find(p => p.id === id)?.name || '';
  }
}
