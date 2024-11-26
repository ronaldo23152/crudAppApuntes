import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';  // Importa ToastController

import { Firestore, collection, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {
  noteId: any;        // Para almacenar el ID de la nota
  note: any = {          // Para almacenar los datos de la nota
    title: '',
    message: ''
  };

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,  // Usa Firestore modular
     
    private toastController: ToastController  // Inyecta ToastController

  ) {}

  ngOnInit() {
    this.noteId = this.route.snapshot.paramMap.get('id');  // Captura el ID desde la URL
    this.loadNote();  // Cargar los datos de la nota
  }

  // Cargar la nota desde Firestore
  async loadNote() {
    const noteRef = doc(this.firestore, 'notes', this.noteId);
    const docSnap = await getDoc(noteRef);
    if (docSnap.exists()) {
      this.note = docSnap.data();
    }
  }

  // Actualizar la nota en Firestore
  async updateNote() {
    const noteRef = doc(this.firestore, 'notes', this.noteId);
    await updateDoc(noteRef, {
      title: this.note.title,
      message: this.note.message,
      updatedAt: new Date()
    });
    this.presentToast();
  }

  // Método para mostrar la notificación (toast)
async presentToast() {
  const toast = await this.toastController.create({
    message: 'Nota EDITADA',  // Mensaje de la notificación
    duration: 2000,            // Duración: 2 segundos
    position: 'bottom',        // Aparece en la parte inferior
    color: 'success'           // Color verde para éxito (puedes cambiarlo)
  });
  await toast.present();  // Muestra el toast
}

}
