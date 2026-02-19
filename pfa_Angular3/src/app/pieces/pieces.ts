import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PieceService } from '../services/piece';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.html',
  styleUrls: ['./pieces.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PiecesComponent {
  pieces: any[] = [];
  newPieceName: string = ''; 

  constructor(private pieceService: PieceService ,private router: Router) {}

  ngOnInit(): void {
    this.loadPieces();
  }

  loadPieces() {
    this.pieceService.getPieces().subscribe(data => this.pieces = data);
  }

   addPiece() {
    if (!this.newPieceName.trim()) return;

    const dto = { name: this.newPieceName };

    this.pieceService.addPiece(dto).subscribe({
      next: (res: any) => {
        const newPieceId = res.pieceId; // Récupération de l’ID retourné par le backend

        // Réinitialiser le champ input
        this.newPieceName = '';

        // Redirection automatique vers la page Ajouter Équipement pour cette pièce
        this.router.navigate(['/equipement', newPieceId]);
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la pièce', err);
      }
    });
  }

  deletePiece(id: number) {
    this.pieceService.deletePiece(id).subscribe(() => this.loadPieces());
  }
}
