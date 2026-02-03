importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyA7PTBoaKVAxXrpBNWSzbin5XGkbQBGrWY",
  authDomain: "sala-bolao.firebaseapp.com",
  projectId: "sala-bolao",
  storageBucket: "sala-bolao.appspot.com",
  messagingSenderId: "19354677995",
  appId: "1:19354677995:web:374ae89b72107e8b0844ae",
  measurementId: "G-C09QTEFN5L"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Notificação em background
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Mensagem background:', payload);
  const title = payload.notification?.title || "Nova mensagem";
  const body = payload.notification?.body || payload.data?.mensagem || "";

  const options = {
    body,
    icon: 'icon.png',
    badge: 'icon.png',
    data: { sound: 'alerta.mp3' } // link do áudio que será tocado
  };

  self.registration.showNotification(title, options);
});

// Evento de click na notificação
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // Abrir a aba do site se não estiver aberta
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientList => {
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

// Evento para tocar som quando notificação aparece
self.addEventListener('notificationclose', function(event) {
  console.log('[SW] Notificação fechada', event);
});

// Observação: devido a restrições do browser, não podemos tocar som diretamente do SW,
// mas ao abrir a aba via click, o som será reproduzido.
