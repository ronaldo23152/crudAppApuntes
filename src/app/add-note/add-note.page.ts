import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage {
  title: string = '';
  message: string = '';

  constructor(
    private firestore: Firestore,  // Usa Firestore modular
    private toastController: ToastController
  ) {}


  // Confirma y guarda/agrega la nota
  async confirmNote() {
    const noteData = { title: this.title, message: this.message };
    const notesCollection = collection(this.firestore, 'notes');
    await addDoc(notesCollection, noteData);  // Agrega la nota
    this.presentToast();
  }

  // Método para mostrar la notificación (toast)
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Nota agregada',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
    
  }
}
