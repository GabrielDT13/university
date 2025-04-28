import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private firestore: Firestore) {}

  addSubject(subject: Subject) {
    const subjectRef = collection(this.firestore, 'subjects');
    return addDoc(subjectRef, subject);
  }

  getSubjects(): Observable<Subject[]> {
    const subjectRef = collection(this.firestore, 'subjects');
    return collectionData(subjectRef, { idField: 'id' }) as Observable<Subject[]>;
  }

  deleteSubject(id: string) {
    const subjectDoc = doc(this.firestore, `subjects/${id}`);
    return deleteDoc(subjectDoc);
  }

  updateSubject(id: string, subject: Partial<Subject>) {
    const subjectDoc = doc(this.firestore, `subjects/${id}`);
    return updateDoc(subjectDoc, subject);
  }
}
