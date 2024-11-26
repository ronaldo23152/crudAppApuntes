import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';  // API modular

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  private auth = getAuth();

  constructor(
    private alertController: AlertController,
    private router: Router,
     
  ) {}

  // Método para iniciar sesión
  async login() {
    try {
      // Usar la función modular signInWithEmailAndPassword con el auth como primer argumento
      const userDetails = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Inicio de sesión exitoso con detalles del usuario:', userDetails);

      await this.presentAlert('Inicio de sesión exitoso', '¡Has iniciado sesión correctamente!');
      this.router.navigate(['/home']); // Redirigir a otra página después del login
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error durante el inicio de sesión. Verifica tus credenciales e intenta nuevamente.';

      // Manejo de errores más detallado
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No se encontró un usuario con este correo electrónico.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'La contraseña es incorrecta.';
      }

      await this.presentAlert('Error al iniciar sesión', errorMessage);
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
