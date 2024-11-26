import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notes: any[] = [];

  constructor(
    private auth: Auth,          // Usa Auth modular
    private router: Router,
    private firestore: Firestore  // Usa Firestore modular
  ) {}

  ngOnInit() {
    this.loadNotes();  // Carga notas al iniciar
  }

  // Cargar notas desde Firestore
  loadNotes() {
    const notesCollection = collection(this.firestore, 'notes');
    collectionData(notesCollection, { idField: 'id' }).subscribe(res => {
      this.notes = res;  // Almacena las notas en el array
    });
  }

  // Logout del usuario
  async onLogout() {
    await signOut(this.auth);  // Cierra sesión con la API modular
    this.router.navigate(['/login']);
  }
}
