import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent]
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  client: Client = { name: '', email: '' };
  editMode = false;
  editId: string | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  async saveClient() {
    if (this.editMode && this.editId) {
      this.clientService.updateClient(this.editId, this.client).then(() => this.resetForm());
    } else {
      await this.clientService.addClient(this.client);
      this.resetForm();
    }
  }

  editClient(c: Client) {
    this.client = { name: c.name, email: c.email };
    this.editId = c.id!;
    this.editMode = true;
  }

  deleteClient(id: string) {
    this.clientService.deleteClient(id);
  }

  resetForm() {
    this.client = { name: '', email: '' };
    this.editMode = false;
    this.editId = null;
  }
}
