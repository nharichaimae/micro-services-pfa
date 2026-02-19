import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// DTOs / Interfaces
export interface Piece {
  id: number;
  nom: string;
}

export interface Equipement {
  id: number;
  nom: string;
  id_Piece: number;
}

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  private apiUrl = 'http://localhost:5297/api';

  constructor(private http: HttpClient) { }

  // Générer les headers avec JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // JWT stocké après login
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // -------------------
  // Pièces
  // -------------------

  // Ajouter une pièce
  addPiece(data: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/piece`, data, {
      headers: this.getHeaders()
    });
  }

  // Lister les pièces de l'utilisateur connecté
  getPieces(): Observable<Piece[]> {
    return this.http.get<Piece[]>(`${this.apiUrl}/pieces`, {
      headers: this.getHeaders()
    });
  }

  // Supprimer une pièce
  deletePiece(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/piece/${id}`, {
      headers: this.getHeaders()
    });
  }

  // -------------------
  // Équipements
  // -------------------

  // Ajouter un équipement à une pièce
  addEquipement(pieceId: number, data: { nom: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/piece/${pieceId}/equipement`, data, {
      headers: this.getHeaders()
    });
  }
    // Supprimer un équipement
  deleteEquipement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/equipement/${id}`, {
      headers: this.getHeaders()
    });
  }
}
