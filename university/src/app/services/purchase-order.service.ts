import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../models/purchase-order.model';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  constructor(private firestore: Firestore) {}

  async addPurchaseOrder(po: PurchaseOrder) {
    const collRef = collection(this.firestore, 'purchase-orders');
    const snapshot = await getDocs(collRef);
    const newId = `purchaseorder_${snapshot.size + 1}`;
    const docRef = doc(this.firestore, `purchase-orders/${newId}`);
    return setDoc(docRef, po);
  }

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    const collRef = collection(this.firestore, 'purchase-orders');
    return collectionData(collRef, { idField: 'id' }) as Observable<PurchaseOrder[]>;
  }

  deletePurchaseOrder(id: string) {
    const docRef = doc(this.firestore, `purchase-orders/${id}`);
    return deleteDoc(docRef);
  }

  updatePurchaseOrder(id: string, data: Partial<PurchaseOrder>) {
    const docRef = doc(this.firestore, `purchase-orders/${id}`);
    return updateDoc(docRef, data);
  }
}
