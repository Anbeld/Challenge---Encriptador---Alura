// Declaración de variables que se utilizan en más de una función
var campoTexto;
var textoActual;

// Declaración del Array que almacena las claves del encriptador
var variablesEncriptador = {
    'e':'enter',
    'i':'imes',
    'a':'ai',
    'o':'ober',
    'u':'ufat'
}

// Declaración del Array que almacena las claves del desencriptador
var variablesDesencriptador = { 
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'  
}

// Declaración del Array que almacena los posibles errores en el input
var eliminarErroresInput = {
    'A': 'a',
    'B': 'b',
    'C': 'c',
    'D': 'd',
    'E': 'e',
    'F': 'f',
    'G': 'g',
    'H': 'h',
    'I': 'i',
    'J': 'j',
    'K': 'k',
    'L': 'l',
    'M': 'm',
    'N': 'n',
    'O': 'o',
    'P': 'p',
    'Q': 'q',
    'R': 'r',
    'S': 's',
    'T': 't',
    'U': 'u',
    'V': 'v',
    'W': 'w',
    'X': 'x',
    'Y': 'y',
    'Z': 'z',
    'Á': 'a',
    'É': 'e',
    'Í': 'i',
    'I': 'i',
    'Ó': 'o',
    'O': 'o',
    'Ú': 'u',
    'U': 'u',
    'Ü': 'u',
    'Ñ': 'ñ',
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'ü': 'u'
};

// Función que permite asignar un texto a un elemento
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Habilita o deshabilita el textarea deseado
function habilitarTextarea(textarea, bool) {
    let elementoHTML =  document.querySelector(textarea);
    elementoHTML.disabled = bool;
    return;
}

/* 
Muestra en el textarea identificada por el id "textoAMostrar" un 
placeholder con la información de la función que se intentó utilizar.
*/ 
function campoVacio(funcion){
    let nuevoPlaceholder = 'No ha ingresado texto a '+ funcion;
    document.getElementById('textoAMostrar').placeholder = nuevoPlaceholder;
}

// Habilita o deshabilita los botones
function habilitarBotones(boton, estado){
    estadoBoton = document.getElementById(boton);
    estadoBoton.disabled = estado; /* Cuando se ingrese "false" habilita el botón, cuando se ingrese "true" lo deshabilita */
}

// Verifica que en el texto no ingresen mayusculas ni carácteres especiales como las tildes
function verificarTexto(event) {
    let teclaPresionada =  event.key; /* Obtiene la tecla que fue presionada */
    campoTexto = document.getElementById('textoIngresado'); 
    textoActual = campoTexto.value;
    if (teclaPresionada in eliminarErroresInput){
        event.preventDefault(); /* Evita que se muestre la tecla presionada */
        campoTexto.value = textoActual + eliminarErroresInput[teclaPresionada]; /* Agrega la nueva letra corregida */
    }
} 

// Encripta el mensaje
function encriptar(){
    campoTexto = document.getElementById('textoIngresado'); /* Selecciona el textarea "textoIngresado" */
    textoActual = campoTexto.value; /* Obtiene y asigna el valor del textarea seleccionado */
    let textoEncriptado=''; /* Inicializa la variable en "" */

    if(textoActual == ''){
        campoVacio('encriptar'); /* Si el campo del textarea "textoIngresado" es vacio, envía un mensaje que dice que el textarea se encuentra vacio */
    } else {
        for (let i = 0; i < textoActual.length; i++){
            let caracter = textoActual.charAt(i); /* Obtiene el carácter especifico de un determinado indice */
            if (caracter in variablesEncriptador){
                textoEncriptado = textoEncriptado + variablesEncriptador[caracter]; /* Si el carácter se encuentra en el array lo cambia */
            } else {textoEncriptado= textoEncriptado + caracter}} /* Si no está en el array agrega el carácter ingresado sin hacerle ningún cambio */
            
            asignarTextoElemento("#textoAMostrar", textoEncriptado); /* Asignación del texto encriptado al textarea con el ID #texto a Mostrar */
            asignarTextoElemento('#copiar', 'Copiar texto encriptado'); /* Asigna un texto al botón copiar */
            
            // Habilita el botón 'copiar' y deshabilita los botones 'encriptar' y 'desencriptar'
            habilitarBotones('copiar', false);
            habilitarBotones('encriptar', true);
            habilitarBotones('desencriptar', true);
        }
}

// Desencripta el mensaje
function desencriptar(){
    campoTexto = document.getElementById('textoIngresado'); /* Selecciona el textarea "textoIngresado" */
    textoActual = campoTexto.value; /* Obtiene y asigna el valor del textarea seleccionado */
    let textoDesencriptado = textoActual; /* Asigna el valor del textarea "textoIngresado" a la nueva variable textoDesencriptado */
    let llave = ''; 

    if(textoActual == ''){
        campoVacio('desencriptar');
    } else {
        for (i = 0; i < Object.keys(variablesDesencriptador).length; i++){ /* Mientras i sea menor a la cantidad de llaves en el array variablesDesencriptador */
            llave = Object.keys(variablesDesencriptador)[i]; /* Cada que encuentra un carácter que cumpla la condición de ser una llave, lo guarda */
            textoDesencriptado = textoDesencriptado.replaceAll(llave, variablesDesencriptador[llave]); /* Reemplaza todos los valores iguales a la llave por los valores del valor en el array*/
        }
        
        asignarTextoElemento("#textoAMostrar", textoDesencriptado); /* Asignación del texto desencriptado al textarea con el ID #texto a Mostrar */
        asignarTextoElemento('#copiar', 'Copiar texto desencriptado'); /* Asigna un texto al botón copiar */
        
        // Deshabilita el botón 'copiar' y habilita los botones 'encriptar' y 'desencriptar'
        habilitarBotones('copiar', false);
        habilitarBotones('encriptar', true);
        habilitarBotones('desencriptar', true);
    }
}

// Definición de una función asincrónica llamada copiar
async function copiar(){
    try {
        const textoCopiado = document.getElementById('textoAMostrar').innerHTML; /* // Obtiene el contenido del elemento con el ID 'textoAMostrar' */
        await navigator.clipboard.writeText(textoCopiado); /* Intenta copiar el texto al portapapeles utilizando la API del portapapeles */
        console.log('Contenido copiado al portapapeles'); /* Muestra un mensaje en la consola indicando que el contenido se ha copiado al portapapeles */

        // Deshabilita el botón 'copiar' y habilita los botones 'encriptar' y 'desencriptar'
        habilitarBotones('copiar', true);
        habilitarBotones('encriptar', false);
        habilitarBotones('desencriptar', false);

        let mensaje = document.getElementById("mensaje-copiado"); /* Muestra el mensaje de 'Texto copiado' en la interfaz por 1 segundo */
        mensaje.style.display = 'block';
        setTimeout(function() {
            mensaje.style.display = 'none';
          }, 1000);
    } catch (err) {
        console.error('Error al copiar: ', err); /* Captura y maneja cualquier error que ocurra durante el proceso de copiado */
    }
}

// Función que habilita los botones
function focusTextoIngresado(){
    let elementoSeleccionado =document.getElementById('textoIngresado');
    // Deshabilita el botón 'copiar' y habilita los botones 'encriptar' y 'desencriptar'
    habilitarBotones('copiar', true);
    habilitarBotones('encriptar', false);
    habilitarBotones('desencriptar', false);
    elementoSeleccionado.select();
}