// Event listeners para el botón de mostrar información y de descripción
document.getElementById("mostrarInformacionBtn").addEventListener("click", mostrarInformacion);
document.getElementById("descripcionBtn").addEventListener("click", mostrarFormulario);

// Obtener el nombre de la persona desde el título de la página
function obtenerNombreDesdeTitle() {
  const title = document.title;  // Obtener el título de la página
  console.log("Título de la página:", title);  // Verificar el título
  
  // Extraer el nombre de la cadena de texto, antes del guion
  const nombre = title.split('-')[0];  // "Laura" de "Laura-gtT5HA"
  
  console.log("Nombre extraído del título:", nombre);
  return nombre.trim();  // Retornar el nombre extraído
}

const nombre = obtenerNombreDesdeTitle();  // Llamar a la función para obtener el nombre
console.log("Nombre:", nombre);

// Función para mostrar la información del amigo secreto
function mostrarInformacion() {
 
}

// Diccionario con la información de los amigos secretos
const amigosSecretos = [
  { nombre: "AlbaLu", codigo: "TH6Y4", AmigoSecreto: "GloGlo", descripcion: "" },
  { nombre: "Carmenza", codigo: "GT4R5", AmigoSecreto: "AlbaLu", descripcion: "" },
  { nombre: "Elizabeth", codigo: "Ll8iK6", AmigoSecreto: "Oscar", descripcion: "Querido amigo secreto, me gustaría 'un jueguito de posillos chocolateros'" },
  { nombre: "GloGlo", codigo: "Gr4T55", AmigoSecreto: "Laura", descripcion: "Querido Santa Secreto, me gustaría 'un short, sandalias'" },
  { nombre: "Hugo", codigo: "BNj76", AmigoSecreto: "Javier", descripcion: "" },
  { nombre: "Javier", codigo: "NMi92", AmigoSecreto: "JuanDi", descripcion: "" },
  { nombre: "JuanDi", codigo: "Grd34RR", AmigoSecreto: "Paula", descripcion: "" },
  { nombre: "Laura", codigo: "gtT5HA", AmigoSecreto: "Elizabeth", descripcion: "Querido amigo secreto me gustaría 'Puede ser un bolso bonito o un joyero o un hoodie oversize talla M'" },
  { nombre: "Oscar", codigo: "ACQ78", AmigoSecreto: "Carmenza", descripcion: "Querido Santa secreto, me gustaría 'Buso de capota o hoodie, negro si teine emblemas de BMW mejor sino q sea bonito sin tanto estampado, talla XL y que gracias'" },
  { nombre: "Paula", codigo: "QQt4A", AmigoSecreto: "Hugo", descripcion: "" }
];

// Función para obtener el nombre del amigo secreto basado en el nombre del usuario
function obtenerAmigoSecreto(amigos, nombreUsuario) {
  const amigo = amigos.find(amigo => amigo.nombre === nombreUsuario);  // Buscar al amigo que tenga el mismo nombre
  console.log("Buscando amigo secreto para:", nombreUsuario);
  console.log("Amigo encontrado:", amigo);  // Ver qué objeto se encuentra
  return amigo ? amigo.AmigoSecreto : null;  // Si se encuentra, devolver el amigoSecreto; si no, devolver null
}

// Función obtener descripción de amigo secreto
function obtenerAmigoSecretoDescripcion(amigos, amigosecreto) {
  const amigo = amigos.find(amigo => amigo.nombre === amigosecreto);  // Buscar al amigo que tenga el mismo nombre
  console.log("Amigo secreto:", amigosecreto);
  console.log("Descripcion encontrado:", amigo);  // Ver qué objeto se encuentra
  return amigo ? amigo.descripcion : null;  // Si se encuentra, devolver el amigoSecreto; si no, devolver null
}

// Obtener el nombre de la persona desde el título de la página
function obtenerNombreDesdeTitle() {
  const title = document.title;  // Obtener el título de la página
  console.log("Título de la página:", title);  // Verificar el título

  const nombre = title.split('-')[0];  // Extraer el nombre antes del guion
  console.log("Nombre extraído del título:", nombre);  // Verificar que el nombre sea correcto
  return nombre;
}

 // Mostrar información al hacer clic en el botón "Mostrar Información"
 document.getElementById("mostrarInformacionBtn").addEventListener("click", function() {
  const nombreUsuario = obtenerNombreDesdeTitle();  // Obtener el nombre desde el título
  const amigoSecreto = obtenerAmigoSecreto(amigosSecretos, nombreUsuario);
  const descripcionAS = obtenerAmigoSecretoDescripcion(amigosSecretos, amigoSecreto);

  if (amigoSecreto) {
    document.getElementById("nombreAmigo").innerText = `Amigo Secreto: ${amigoSecreto}`;
    // Si tienes descripción, también la mostrarías aquí
    //document.getElementById("descripcionAmigo").innerText = "Tu amigo secreto no ha dicho nada :("; // Como no hay descripción, se pone esto por defecto
    if (descripcionAS) {
      document.getElementById("descripcionAmigo").innerText = descripcionAS; // Como no hay descripción, se pone esto por defecto
    } else {
      document.getElementById("descripcionAmigo").innerText = "Tu amigo secreto no ha dicho nada :(";
    }
  } else {
    alert("No se encontró el amigo secreto para este nombre.");
  }
});

// Función para mostrar/ocultar el formulario
function mostrarFormulario() {
  document.getElementById("formulario").style.display = "block";
}

// Agregar la función de envío del formulario si se necesita
function actualizarDescripcionEnSheet(event) {
  event.preventDefault();  // Evitar el envío por defecto del formulario

  const descripcion = document.getElementById("descripcion").value;  // Obtenemos la descripción del formulario
  const senderName = nombre;  // Usamos el nombre que ya está obtenido de la página

  console.log("Descripción enviada:", descripcion);  // Verificamos en consola si se obtiene la descripción

  // Hacer una solicitud POST a la función de Google Cloud
  fetch('https://us-central1-santasecreto2.cloudfunctions.net/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ senderName, message: descripcion })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Mensaje enviado exitosamente');
      // Ocultar el formulario después de enviar el mensaje
      document.getElementById("formulario").style.display = 'none'; // Esto oculta el formulario
      document.getElementById("descripcion").value = ''; // Limpiar el campo de texto
    } else {
      alert('Error al enviar el mensaje');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al enviar el mensaje');
  });
}

// Evento para el botón de "Enviar" del formulario
document.getElementById("enviarBtn").addEventListener("click", actualizarDescripcionEnSheet);

// Función para redirigir al índice correspondiente
function redirigir(nombre) {
  window.location.href = `pages/${nombre}-gtT5HA.html`;
}

// Función para mostrar/ocultar el menú
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show'); // Cambia entre mostrar y ocultar el menú
}
