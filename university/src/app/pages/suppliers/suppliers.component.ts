import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  supplier: Supplier = { name: '', contact: '' };
  editMode = false;
  editId: string | null = null;

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.supplierService.getSuppliers().subscribe(data => this.suppliers = data);
  }

  async saveSupplier() {
    if (this.editMode && this.editId) {
      this.supplierService.updateSupplier(this.editId, this.supplier).then(() => this.resetForm());
    } else {
      await this.supplierService.addSupplier(this.supplier);
      this.resetForm();
    }
  }

  editSupplier(s: Supplier) {
    this.supplier = { name: s.name, contact: s.contact };
    this.editId = s.id!;
    this.editMode = true;
  }

  deleteSupplier(id: string) {
    this.supplierService.deleteSupplier(id);
  }

  resetForm() {
    this.supplier = { name: '', contact: '' };
    this.editMode = false;
    this.editId = null;
  }
}
