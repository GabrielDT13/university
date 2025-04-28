import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(private firestore: Firestore) {}

  addGrade(grade: Grade) {
    const gradeRef = collection(this.firestore, 'grades');
    return addDoc(gradeRef, grade);
  }

  getGrades(): Observable<Grade[]> {
    const gradeRef = collection(this.firestore, 'grades');
    return collectionData(gradeRef, { idField: 'id' }) as Observable<Grade[]>;
  }

  deleteGrade(id: string) {
    const gradeDoc = doc(this.firestore, `grades/${id}`);
    return deleteDoc(gradeDoc);
  }

  updateGrade(id: string, grade: Partial<Grade>) {
    const gradeDoc = doc(this.firestore, `grades/${id}`);
    return updateDoc(gradeDoc, grade);
  }
}
