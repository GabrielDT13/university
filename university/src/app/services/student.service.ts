import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  getDocs, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private firestore: Firestore) {}

  async addStudent(student: Student) {
    const studentsCollection = collection(this.firestore, 'students');

    const snapshot = await getDocs(studentsCollection);
    const count = snapshot.size + 1;

    const newId = `student_${count}`;
    const studentDoc = doc(this.firestore, `students/${newId}`);

    return setDoc(studentDoc, student);
  }

  getStudents(): Observable<Student[]> {
    const studentRef = collection(this.firestore, 'students');
    return collectionData(studentRef, { idField: 'id' }) as Observable<Student[]>;
  }

  deleteStudent(id: string) {
    const studentDoc = doc(this.firestore, `students/${id}`);
    return deleteDoc(studentDoc);
  }

  updateStudent(id: string, student: Partial<Student>) {
    const studentDoc = doc(this.firestore, `students/${id}`);
    return updateDoc(studentDoc, student);
  }
}
