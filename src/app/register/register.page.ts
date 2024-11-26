import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';  // API modular

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  private auth = getAuth();  // Inicializar auth

  constructor(
    private alertController: AlertController,
    private router: Router,
    
  ) {}

  // Método para registrar un nuevo usuario
  async register() {
    try {
      
      const userDetails = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Registro exitoso:', userDetails);

      await this.presentAlert('Registro exitoso', '¡Tu cuenta ha sido creada correctamente!');
      this.router.navigate(['/home']); // Redirigir después del registro
    } catch (error: any) {
      console.error('Error al registrar:', error);

      let errorMessage = 'No se pudo registrar. Verifica los datos e inténtalo nuevamente.';

      // Manejo de errores detallado
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico ya está en uso.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      }

      await this.presentAlert('Error de registro', errorMessage);
    }
  }

  // Método para mostrar un alert
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
