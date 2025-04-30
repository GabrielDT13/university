import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private firestore: Firestore) {}

  async addTask(task: Task) {
    const collRef = collection(this.firestore, 'tasks');
    const snapshot = await getDocs(collRef);
    const newId = `task_${snapshot.size + 1}`;
    const docRef = doc(this.firestore, `tasks/${newId}`);
    return setDoc(docRef, task);
  }

  getTasks(): Observable<Task[]> {
    const collRef = collection(this.firestore, 'tasks');
    return collectionData(collRef, { idField: 'id' }) as Observable<Task[]>;
  }

  deleteTask(id: string) {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(docRef);
  }

  updateTask(id: string, data: Partial<Task>) {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return updateDoc(docRef, data);
  }
}
