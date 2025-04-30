import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private firestore: Firestore) {}

  async addOrder(order: Order) {
    const collRef = collection(this.firestore, 'orders');
    const snapshot = await getDocs(collRef);
    const newId = `order_${snapshot.size + 1}`;
    const docRef = doc(this.firestore, `orders/${newId}`);
    return setDoc(docRef, order);
  }

  getOrders(): Observable<Order[]> {
    const collRef = collection(this.firestore, 'orders');
    return collectionData(collRef, { idField: 'id' }) as Observable<Order[]>;
  }

  deleteOrder(id: string) {
    const docRef = doc(this.firestore, `orders/${id}`);
    return deleteDoc(docRef);
  }

  updateOrder(id: string, data: Partial<Order>) {
    const docRef = doc(this.firestore, `orders/${id}`);
    return updateDoc(docRef, data);
  }
}
