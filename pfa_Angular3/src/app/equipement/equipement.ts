import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule,} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PieceService } from '../services/piece';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-equipement',
  templateUrl: './equipement.html',
  styleUrls: ['./equipement.scss'],
  imports: [ReactiveFormsModule ,CommonModule,FormsModule],
})
export class AddEquipementComponent implements OnInit {

  pieceId!: number;
  equipementForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private pieceService: PieceService,
    private route: ActivatedRoute,
     private router: Router
  ) {
    this.equipementForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      etat: ['Off', Validators.required]
    });
  }

  ngOnInit() {
    // Récupérer l'id de la pièce depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.pieceId = Number(params.get('id'));
    });
  }
  

  onSubmit() {
    if (!this.pieceId) {
      this.message = 'Erreur : Id de pièce manquant';
      return;
    }

    if (this.equipementForm.invalid) {
      this.message = 'Veuillez remplir le nom et l’état';
      return;
    }

    const data = {
      nom: this.equipementForm.value.nom,
      description: this.equipementForm.value.description,
      etat: this.equipementForm.value.etat
    };

    this.pieceService.addEquipement(this.pieceId, data).subscribe({
      next: () => {
        this.message = 'Équipement ajouté avec succès !';
        this.equipementForm.reset({ etat: 'Off' });
        this.router.navigate(['/client-dash']);
      },
      error: (err) => {
        this.message = 'Erreur : ' + (err.error?.message || err.message);
      }
    });
  }
}
