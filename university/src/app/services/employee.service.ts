import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, updateDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private firestore: Firestore) {}

  async addEmployee(employee: Employee) {
    const collRef = collection(this.firestore, 'employees');
    const snapshot = await getDocs(collRef);
    const newId = `employee_${snapshot.size + 1}`;
    const docRef = doc(this.firestore, `employees/${newId}`);
    return setDoc(docRef, employee);
  }

  getEmployees(): Observable<Employee[]> {
    const collRef = collection(this.firestore, 'employees');
    return collectionData(collRef, { idField: 'id' }) as Observable<Employee[]>;
  }

  deleteEmployee(id: string) {
    const docRef = doc(this.firestore, `employees/${id}`);
    return deleteDoc(docRef);
  }

  updateEmployee(id: string, data: Partial<Employee>) {
    const docRef = doc(this.firestore, `employees/${id}`);
    return updateDoc(docRef, data);
  }
}
