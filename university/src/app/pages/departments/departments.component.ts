import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  department: Department = { name: '' };
  editMode = false;
  editId: string | null = null;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(data => this.departments = data);
  }

  async saveDepartment() {
    if (this.editMode && this.editId) {
      this.departmentService.updateDepartment(this.editId, this.department).then(() => this.resetForm());
    } else {
      await this.departmentService.addDepartment(this.department);
      this.resetForm();
    }
  }

  editDepartment(d: Department) {
    this.department = { name: d.name };
    this.editId = d.id!;
    this.editMode = true;
  }

  deleteDepartment(id: string) {
    this.departmentService.deleteDepartment(id);
  }

  resetForm() {
    this.department = { name: '' };
    this.editMode = false;
    this.editId = null;
  }
}
