import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/custom-service-worker.js',{ scope: '/'}).then(registration => {
      console.log('Service Worker registrado con éxito:', registration);
    }).catch(err => {
      console.error('Falló la registración del Service Worker:', err);
    });
  }
//   // Verifica si el navegador soporta notificaciones
// if ('Notification' in window) {
//   // Solicitar permiso
//   Notification.requestPermission().then(permission => {
//     if (permission === 'granted') {
//       console.log('¡Permiso concedido para notificaciones!');
//     } else {
//       console.log('Permiso denegado para notificaciones');
//     }
//   });
// } else {
//   console.log('Este navegador no soporta notificaciones push');
//}

