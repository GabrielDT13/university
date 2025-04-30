import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private firestore: Firestore) {}

  async addProduct(product: Product) {
    const collRef = collection(this.firestore, 'products');
    const snapshot = await getDocs(collRef);
    const newId = `product_${snapshot.size + 1}`;
    const docRef = doc(this.firestore, `products/${newId}`);
    return setDoc(docRef, product);
  }

  getProducts(): Observable<Product[]> {
    const collRef = collection(this.firestore, 'products');
    return collectionData(collRef, { idField: 'id' }) as Observable<Product[]>;
  }

  deleteProduct(id: string) {
    const docRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(docRef);
  }

  updateProduct(id: string, data: Partial<Product>) {
    const docRef = doc(this.firestore, `products/${id}`);
    return updateDoc(docRef, data);
  }
}
