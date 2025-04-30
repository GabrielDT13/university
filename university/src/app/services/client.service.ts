import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private firestore: Firestore) {}

  async addClient(client: Client) {
    const collRef = collection(this.firestore, 'clients');
    const snapshot = await getDocs(collRef);
    const newId = `client_${snapshot.size + 1}`;
    const docRef = doc(this.firestore, `clients/${newId}`);
    return setDoc(docRef, client);
  }

  getClients(): Observable<Client[]> {
    const collRef = collection(this.firestore, 'clients');
    return collectionData(collRef, { idField: 'id' }) as Observable<Client[]>;
  }

  deleteClient(id: string) {
    const docRef = doc(this.firestore, `clients/${id}`);
    return deleteDoc(docRef);
  }

  updateClient(id: string, data: Partial<Client>) {
    const docRef = doc(this.firestore, `clients/${id}`);
    return updateDoc(docRef, data);
  }
}
