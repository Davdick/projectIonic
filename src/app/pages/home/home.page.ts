import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showNotification() {
    console.log(Notification.permission);
    if (Notification.permission === 'granted') {
     
      const notification = new Notification('Nueva Notificación', {
        body: "this.message",
        icon: '../assets/logo-uta.png'
      });

      notification.onshow = () => {
        console.log('Notificación mostrada');
      };

      notification.onerror = (error) => {
        console.log('Error en la notificación:', error);
      };

      notification.onclose = () => {
        console.log('Notificación cerrada');
      };
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const notification = new Notification('Nueva Notificación', {
            body: "xd",
            icon: '../assets/logo-uta.png'
          });
        } else {
          console.log('Permiso no otorgado');
        }
      });
    }
  }
}

