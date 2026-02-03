importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA7PTBoaKVAxXrpBNWSzbin5XGkbQBGrWY",
  authDomain: "sala-bolao.firebaseapp.com",
  projectId: "sala-bolao",
  messagingSenderId: "19354677995",
  appId: "1:19354677995:web:374ae89b72107e8b0844ae"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192.png"
  });
});
