const facebook = document.getElementById('facebook');
const gmail = document.getElementById('gmail');
// REGISTRO DE USUARIOS
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const register = document.getElementById('register');

// LOGUEO DE USUARIOS
const email1 = document.getElementById('email2');
const password1 = document.getElementById('password2');
const ingreso = document.getElementById('ingreso');

const closeSesion = document.getElementById('close');

const editar = document.getElementById('buttons');
const divPosts1 = document.getElementById('divPosts1');
const divPosts = document.getElementById('divPosts');
const modal = document.getElementById('exampleModal');
const divPostsArea = document.getElementById('divPostsArea');
const content = document.getElementById('content');

let isUserAuthenticate = false;
let userProfile = {};

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('existe usuario');
      // if (user.emailVerified) {
      let userUid = firebase.auth().currentUser.uid;
      firebase.database().ref('Users/' + userUid).on('value', (userRef) => {
        let user = userRef.val();
        userProfile = user;
        console.log(user);
        content.innerHTML = `Bienvenid@  ${user.nombre}`;
        closeSesion.classList.remove('hiden');
        closeSesion.classList.add('show');
        editar.classList.remove('show');
        editar.classList.add('hiden');
        editar.classList.remove('show');
        editar.classList.add('hiden');
        divPostsArea.classList.remove('hiden');
        divPostsArea.classList.add('show');
        isUserAuthenticate = true;
        listarPublicos();
      });
      console.log(userUid);
    }else{
      divPostsArea.classList.remove('show');
      divPostsArea.classList.add('hidden');
      listarPublicos();
    }
  });
}


register.addEventListener('click', () => {
  if(validadorNombre(name.value) === false) {
    alert('nombre incorrecto');
  } else if (validadorEmail(email.value) === false) {
    alert('email incorrecta');
  } else if (validadorPassword(password.value) === false) {
    alert('tiene que tener como minimo 6 caracteres y letras')
  } else {
    registerVal(email.value, password.value);
    alert('Has sido registrado exitosamente')
  };
});

ingreso.addEventListener('click', () => {
  ingresoVal(email1.value, password1.value);
});

gmail.addEventListener('click', () => {
  gmailLogin()
});

facebook.addEventListener('click', () => {
  facebookLogin();
});

closeSesion.addEventListener('click', () => {
  close();
  location.reload();
});
