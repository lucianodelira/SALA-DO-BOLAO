importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyA7PTBoaKVAxXrpBNWSzbin5XGkbQBGrWY",
  authDomain:        "sala-bolao.firebaseapp.com",
  projectId:         "sala-bolao",
  storageBucket:     "sala-bolao.appspot.com",
  messagingSenderId: "19354677995",
  appId:             "1:19354677995:web:374ae89b72107e8b0844ae"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[sw] Mensagem background:', payload);

  const title = payload.notification?.title || 'Nova mensagem na sala';
  const options = {
    body: payload.notification?.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'sala-bolao-chat',
    renotify: true
  };

  self.registration.showNotification(title, options);
});
