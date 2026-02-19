import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ChangeDetectorRef } from '@angular/core';
import { ClientFilterPipe } from "../../pipes/client-filter-pipe";


interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  cin: string;
  photoProfil?: string;
}
interface ClientsResponse {
  success: boolean;
  count: number;
  clients: Client[];
}

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ClientFilterPipe],
  templateUrl: './client.html',
  styleUrls: ['./client.scss'],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  searchText: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router,
    private SearchService : SearchService,
    private cdr: ChangeDetectorRef
  ) {}



  ngOnInit(): void {
    this.loadClients();
    this.SearchService.search$.subscribe(text => {
      this.searchText = text;
    });
  }
loadClients(): void {
  this.clientService.getAllClients().subscribe({
    next: (res: Client[]) => {
  this.clients = res;
}
  });
}

// filteredClients(): Client[] {

//   if (!this.searchText) {
//     return this.clients;
//   }

//   const value = this.searchText.toLowerCase();

//   return this.clients.filter(client =>
//     client.nom.toLowerCase().includes(value) ||
//     client.prenom.toLowerCase().includes(value) ||
//     client.email.toLowerCase().includes(value)
//   );
// }

  voirDetails(id: number): void {
    this.router.navigate(['/clients', id]);
  }
  supprimerClient(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => this.loadClients(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}
