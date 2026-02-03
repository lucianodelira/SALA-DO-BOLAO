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

// Notificações background
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Notificação recebida no background:', payload);
  const title = payload.notification?.title || "Nova mensagem";
  const options = {
    body: payload.notification?.body || payload.data?.mensagem || "",
    icon: 'icon.png'
  };
  self.registration.showNotification(title, options);
});
