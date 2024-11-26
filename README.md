# crudAppApuntes
en el folder environments
crea un archivo enviroment.prod.ts
crea un archivo enviroment.ts

copia estos datos y reemplaza con tu proyecto firebase

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
