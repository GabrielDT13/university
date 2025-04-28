import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../models/subject.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-subjects',
  standalone: true,
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  subject: Subject = { name: '', description: '' };
  editMode: boolean = false;
  editId: string | null = null;

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  saveSubject() {
    if (this.editMode && this.editId) {
      this.subjectService.updateSubject(this.editId, this.subject).then(() => this.resetForm());
    } else {
      this.subjectService.addSubject(this.subject).then(() => this.resetForm());
    }
  }

  editSubject(subject: Subject) {
    this.subject = { name: subject.name, description: subject.description };
    this.editMode = true;
    this.editId = subject.id!;
  }

  deleteSubject(id: string) {
    this.subjectService.deleteSubject(id);
  }

  resetForm() {
    this.subject = { name: '', description: '' };
    this.editMode = false;
    this.editId = null;
  }
}
