let config = {
  apiKey: 'AIzaSyAyU-144GII0BR3pdmRcq70rWM_9-fKthY',
  authDomain: 'socialnetwork-proyect.firebaseapp.com',
  databaseURL: 'https://socialnetwork-proyect.firebaseio.com',
  projectId: 'socialnetwork-proyect',
  storageBucket: 'socialnetwork-proyect.appspot.com',
  messagingSenderId: '1041163805568'
};

firebase.initializeApp(config);

const guardaDatos = (user) => {
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL
  };
  firebase.database().ref('Users/' + user.uid)
    .set(usuario);
};

const registerVal = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      alert('confirma tu correo electronico')
      const user = {
        uid: result.user.uid,
        displayName: document.getElementById('name').value,
        email: result.user.email,
        photoURL: 'http://subirimagen.me/uploads/20180725011911.png',
      }
      guardaDatos(user)
      verificar();
  }).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
};

const ingresoVal = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(()=>{
    alert('Usuario con login exitoso');
  })
  .catch((error) => {
  let errorCode = error.code;
  let errorMessage = error.message;
  alert('Error en firebase >'+ errorCode);
  alert('Error en firebase >'+ errorMessage);
  });
};

const close = () => {
    firebase.auth().signOut().then(() => {
      alert('Saliendo...');
    }).catch((error) => {
      console.log(error);
    });
  };

const verificar = () => {
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    alert('enviando correo');
  }).catch((error) => {
    console.log(error);
  });
};

const facebookLogin = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
  'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      guardaDatos(user);
  }).catch((error) => {
    alert('err'+error.message);
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
});
};

const gmailLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
    var user = result.user;
    guardaDatos(user);
  });
};
