import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  employees: Employee[] = [];
  departments: Department[] = [];
  task: Task = { employeeId: '', departmentId: '', description: '' };
  editMode = false;
  editId: string | null = null;

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
    this.departmentService.getDepartments().subscribe(data => this.departments = data);
  }

  async saveTask() {
    if (this.editMode && this.editId) {
      this.taskService.updateTask(this.editId, this.task).then(() => this.resetForm());
    } else {
      await this.taskService.addTask(this.task);
      this.resetForm();
    }
  }

  editTask(t: Task) {
    this.task = { employeeId: t.employeeId, departmentId: t.departmentId, description: t.description };
    this.editId = t.id!;
    this.editMode = true;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  resetForm() {
    this.task = { employeeId: '', departmentId: '', description: '' };
    this.editMode = false;
    this.editId = null;
  }

  getEmployeeName(id: string): string {
    return this.employees.find(e => e.id === id)?.name || '';
  }

  getDepartmentName(id: string): string {
    return this.departments.find(d => d.id === id)?.name || '';
  }
}
