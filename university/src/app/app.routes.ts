import { Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { GradesComponent } from './pages/grades/grades.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'grades', component: GradesComponent }
];
