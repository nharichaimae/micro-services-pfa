import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PieceService } from '../services/piece';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashb',
  templateUrl: './client-dashb.html',
  styleUrl: './client-dashb.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ClientDashb {

  pieces: any[] = [];

  constructor(
    private pieceService: PieceService, 
    private router: Router,
    private cd: ChangeDetectorRef // injection de ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadPieces();
  }

  loadPieces() {
    this.pieceService.getPieces().subscribe(data => {
      this.pieces = data.map(p => ({ ...p, showMenu: false }));
      this.cd.detectChanges(); // <-- force Angular à mettre à jour l'affichage
    });
  }

  goToAddEquipement(pieceId: number) {
    this.router.navigate(['/equipement', pieceId]);
  }

  deletePiece(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette pièce ?")) {
      this.pieceService.deletePiece(id).subscribe(() => {
        this.loadPieces(); // recharge les pièces
        this.cd.detectChanges(); // forcer la mise à jour de l'affichage
      });
    }
  }

  deleteEquip(id: number) {
    if (confirm("Voulez-vous supprimer cet équipement ?")) {
      this.pieceService.deleteEquipement(id).subscribe(() => {
        this.loadPieces(); // recharge les pièces
        this.cd.detectChanges(); // forcer la mise à jour de l'affichage
      });
    }
  }
}
