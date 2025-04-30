import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee = { name: '', department: '' };
  editMode = false;
  editId: string | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  async saveEmployee() {
    if (this.editMode && this.editId) {
      this.employeeService.updateEmployee(this.editId, this.employee).then(() => this.resetForm());
    } else {
      await this.employeeService.addEmployee(this.employee);
      this.resetForm();
    }
  }

  editEmployee(e: Employee) {
    this.employee = { name: e.name, department: e.department };
    this.editId = e.id!;
    this.editMode = true;
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id);
  }

  resetForm() {
    this.employee = { name: '', department: '' };
    this.editMode = false;
    this.editId = null;
  }
}
