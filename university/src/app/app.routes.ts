import { Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { GradesComponent } from './pages/grades/grades.component';
import {EmployeesComponent} from './pages/employees/employees.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {DepartmentsComponent} from './pages/departments/departments.component';
import {ClientsComponent} from './pages/clients/clients.component';
import {ProductsComponent} from './pages/products/products.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {SuppliersComponent} from './pages/suppliers/suppliers.component';
import {PurchaseOrdersComponent} from './pages/purchase-orders/purchase-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'grades', component: GradesComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'purchase-orders', component: PurchaseOrdersComponent },
];
