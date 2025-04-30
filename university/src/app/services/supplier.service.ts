import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  constructor(private firestore: Firestore) {}

  async addSupplier(supplier: Supplier) {
    const collRef = collection(this.firestore, 'suppliers');
    const snapshot = await getDocs(collRef);
    const newId = `supplier_${snapshot.size + 1}`;
    const docRef = doc(this.firestore, `suppliers/${newId}`);
    return setDoc(docRef, supplier);
  }

  getSuppliers(): Observable<Supplier[]> {
    const collRef = collection(this.firestore, 'suppliers');
    return collectionData(collRef, { idField: 'id' }) as Observable<Supplier[]>;
  }

  deleteSupplier(id: string) {
    const docRef = doc(this.firestore, `suppliers/${id}`);
    return deleteDoc(docRef);
  }

  updateSupplier(id: string, data: Partial<Supplier>) {
    const docRef = doc(this.firestore, `suppliers/${id}`);
    return updateDoc(docRef, data);
  }
}
