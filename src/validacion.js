window.validadorNombre = (name) => {
  if ((/^([A-Za-z0-9\s]{8,})+$/g.test(name))) return true
   else return false

};
window.validadorEmail = (email) => {
  if (/^([a-zA-Z0-9._-]{3,})+@([a-zA-Z0-9.-]{5,})+\.([a-zA-Z]{2,})+$/.test(email)) return true;
   else return false;
};
window.validadorPassword = (password) => {
  if (/^([A-Za-z0-9]{8,})+$/g.test(password)) return true;
  else return false;
};
