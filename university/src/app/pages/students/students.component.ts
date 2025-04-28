import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  student: Student = { name: '', email: '' };
  editMode: boolean = false;
  editId: string | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  saveStudent() {
    if (this.editMode && this.editId) {
      this.studentService.updateStudent(this.editId, this.student).then(() => this.resetForm());
    } else {
      this.studentService.addStudent(this.student).then(() => this.resetForm());
    }
  }

  editStudent(student: Student) {
    this.student = { name: student.name, email: student.email };
    this.editMode = true;
    this.editId = student.id!;
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id);
  }

  resetForm() {
    this.student = { name: '', email: '' };
    this.editMode = false;
    this.editId = null;
  }
}
