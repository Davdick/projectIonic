const CACHE_NAME = 'cacheYo';
const STATIC_ASSETS = [
  'index.html',
  '/home'
];

// Instalar el Service Worker y cachear los recursos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caché abierta');
      return cache.addAll(STATIC_ASSETS).catch(error => {
        console.error('Error al agregar archivos al caché:', error);
        // Intentar identificar el recurso específico que falló
        STATIC_ASSETS.forEach(async asset => {
          try {
            await cache.add(asset);
            console.log(`Recurso agregado al caché: ${asset}`);
          
          } catch (e) {
            console.error(`Error al cachear el recurso: ${asset}`, e);
          }
        });
      });
    })
  );
});

// Activar el Service Worker y limpiar el caché antiguo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});
 //Interceptar las solicitudes de red y servir desde el caché
 self.addEventListener('fetch', event => {
  //console.log(`Interceptando solicitud a: ${event.request.url}`);
  //console.log(event.request.url);
  if (event.request.url == 'https://jsonplaceholder.typicode.com/todos/1') {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          console.log('Intentando obtener la respuesta de la red...');
          const response = await fetch(event.request);
          
          if (response && response.status === 200) {
            console.log('Respuesta recibida. Guardando en la caché...');
            cache.put(event.request, response.clone());
          }

          return response;
        } catch (error) {
          console.log('Fallo al obtener de la red. Intentando desde la caché...');
          return cache.match(event.request);
        }
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
//

// Interceptar las solicitudes y manejar la caché
self.addEventListener('fetch', event => {
  // Verifica si la URL es la que deseas manejar (puedes agregar condiciones adicionales)
  if (event.request.url.includes('projects')) {
      console.log("Projects");
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          // Intenta realizar la solicitud de la red
          const response = await fetch(event.request);
          
          // Si la respuesta es válida, la guardas en la caché
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
            console.log('Página almacenada en caché:', event.request.url);
          }
          
          return response;
        } catch (error) {
          // Si hay un error (por ejemplo, falta de conexión), intenta obtener la página de la caché
          return cache.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              console.log('Cargando desde la caché:', event.request.url);
              return cachedResponse;
            }
            // Podrías retornar una página personalizada para manejar errores
            return new Response('No hay conexión y no hay copia en caché disponible.');
          });
        }
      })
    );
  } else {
    // Maneja otras solicitudes normalmente (opcional)
    event.respondWith(fetch(event.request));
  }
});

// Manejar notificaciones push
self.addEventListener('push', function(event) {
  const options = {
    body: event.data.text(), // Contenido de la notificación
    //icon: '/path/to/icon.png', // Icono de la notificación
    //badge: '/path/to/badge.png' // Badge de la notificación
  };

  event.waitUntil(
    self.registration.showNotification('Nueva Notificación', options)
  );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'accion1') {
    clients.openWindow('/ruta1');
  } else if (event.action === 'accion2') {
    clients.openWindow('/ruta2');
  } else {
    clients.openWindow('/');
  }
});