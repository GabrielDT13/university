import { Component, OnInit } from '@angular/core';
import { GradeService } from '../../services/grade.service';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { Grade } from '../../models/grade.model';
import { Student } from '../../models/student.model';
import { Subject } from '../../models/subject.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-grades',
  standalone: true,
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class GradesComponent implements OnInit {
  grades: Grade[] = [];
  students: Student[] = [];
  subjects: Subject[] = [];
  grade: Grade = { studentId: '', subjectId: '', grade: 0 };
  editMode: boolean = false;
  editId: string | null = null;

  constructor(private gradeService: GradeService, private studentService: StudentService, private subjectService: SubjectService) {}

  ngOnInit() {
    this.gradeService.getGrades().subscribe(data => {
      this.grades = data;
    });
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  saveGrade() {
    if (this.editMode && this.editId) {
      this.gradeService.updateGrade(this.editId, this.grade).then(() => this.resetForm());
    } else {
      this.gradeService.addGrade(this.grade).then(() => this.resetForm());
    }
  }

  editGrade(grade: Grade) {
    this.grade = { studentId: grade.studentId, subjectId: grade.subjectId, grade: grade.grade };
    this.editMode = true;
    this.editId = grade.id!;
  }

  deleteGrade(id: string) {
    this.gradeService.deleteGrade(id);
  }

  resetForm() {
    this.grade = { studentId: '', subjectId: '', grade: 0 };
    this.editMode = false;
    this.editId = null;
  }

  getStudentName(id: string): string {
    return this.students.find(s => s.id === id)?.name || '';
  }

  getSubjectName(id: string): string {
    return this.subjects.find(s => s.id === id)?.name || '';
  }
}
