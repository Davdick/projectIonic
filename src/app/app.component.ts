import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private toastController: ToastController) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.requestPermission();
      this.showPushNotification('¡Tienes una nueva notificación!');
      // setInterval(() => {
      //   this.getNotisPush();
      // }, 20000); // Cada 10 segundos
    });
  }


  // Solicitar permisos según la plataforma
  async requestPermission() {
    if (this.platform.is('capacitor')) {
      // Solicitar permisos de notificaciones locales en dispositivos móviles
      try {
        const permission = await LocalNotifications.requestPermissions();
        if (permission?.display === 'granted') {
          console.log('Permiso para notificaciones locales concedido');
        } else {
          console.warn('Permiso para notificaciones locales denegado');
        }
      } catch (error) {
        console.error('Error al solicitar permisos:', error);
      }
    } else if ('Notification' in window) {
      // Solicitar permiso para notificaciones del navegador
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permiso para notificaciones del navegador concedido');
        } else {
          console.warn('Permiso para notificaciones del navegador denegado');
        }
      });
    } else {
      console.warn('Notificaciones no soportadas en este entorno');
    }
  }

  // Consultar el API y mostrar notificaciones
  async getNotisPush() {
    try {
      const response = await fetch('https://localhost:7196/api/sign/xd'); // Cambia esta URL por la real
      const data = await response.json();

      console.log('Respuesta de la API:', data);
      if (data?.response === 'ok') {
        this.showPushNotification('¡Tienes una nueva notificación!');
      }
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
    }
  }

  // Mostrar notificación según la plataforma
  async showPushNotification(message: string) {
    if (this.platform.is('capacitor')) {
      // Mostrar notificación local en dispositivos móviles
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: Math.floor(Math.random() * 1000000),
              title: 'Nueva Notificación',
              body: message,
              schedule: { at: new Date(new Date().getTime() + 1000 * 5) },
              sound: 'default',
            },
          ],
        });
        console.log('Notificación local programada correctamente');
      } catch (error) {
        console.error('Error al mostrar la notificación local:', error);
      }
    } else if ('Notification' in window) {
      // Mostrar notificación del navegador
      
      if (Notification.permission === 'granted') {
        console.log("navegador creando notificacion");
        const notification = new Notification('Nueva Notificación', {
          body: message,
          icon: '../assets/logo-uta.png' // Cambia por la ruta de tu ícono
        });

    new Notification('Nueva Notificación', {
          body: message,
          icon: '../assets/logo-uta.png' // Cambia por la ruta de tu ícono
        });
         // Manejadores de eventos
  notification.onshow = () => {
    console.log('Notificación mostrada');
  };
  notification.onclick = () => {
    console.log('Notificación clickeada');
    notification.close(); // Opcional: Cierra la notificación al hacer clic
  };
  notification.onclose = () => {
    console.log('Notificación cerrada');
  };

  notification.onerror = (e) => {
    console.error('Error al mostrar la notificación:', e);
  };

        console.log('Notificación creada:', notification);
      } else {
        console.warn('Permiso para notificaciones del navegador no concedido');
      }
    } else {
      console.warn('Notificaciones no soportadas en este entorno');
    }

    // Mostrar un toast como fallback
    this.showToast(message);
  }

  // Mostrar un toast para retroalimentación
  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: `Notificación: ${message}`,
      duration: 3000,
      position: 'top',
    });
    await toast.present();
  }


  
  
}
