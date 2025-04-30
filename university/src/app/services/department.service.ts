import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(private firestore: Firestore) {}

  async addDepartment(department: Department) {
    const collRef = collection(this.firestore, 'departments');
    const snapshot = await getDocs(collRef);
    const newId = `department_${snapshot.size + 1}`;
    const docRef = doc(this.firestore, `departments/${newId}`);
    return setDoc(docRef, department);
  }

  getDepartments(): Observable<Department[]> {
    const collRef = collection(this.firestore, 'departments');
    return collectionData(collRef, { idField: 'id' }) as Observable<Department[]>;
  }

  deleteDepartment(id: string) {
    const docRef = doc(this.firestore, `departments/${id}`);
    return deleteDoc(docRef);
  }

  updateDepartment(id: string, data: Partial<Department>) {
    const docRef = doc(this.firestore, `departments/${id}`);
    return updateDoc(docRef, data);
  }
}
