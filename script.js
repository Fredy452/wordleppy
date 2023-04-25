let intentos = 6;
let ganado = 0;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
// Obtenemos una palabr aleatoria de diccionario
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];



// Definimos las constantes
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const valor = input.value;
const VIDA = document.getElementById("vida");
VIDA.innerHTML = intentos;

window.addEventListener('load', init);
function init(){
    // Definimos la fucion intentar que va ser invocado desde el boton
    function intentar(){    
        const INTENTO = leerIntento();

        // Creamos un nuevo div con la clase row para injectar al grid
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';
        // validar imput
        const LETRAS = /^[a-zA-Z]+$/;
        if (INTENTO !== "" && LETRAS.test(INTENTO)) {
            // Creamos el algoritmo principal 
            if (INTENTO === palabra ) {
                for (let i in palabra) {
                    const SPAN = document.createElement('div');
                    SPAN.className = 'row-letter';

                    if (INTENTO[i] === palabra[i]){

                        // Si coinciden cambiamos el color de span
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = '#79b851';
                        SPAN.style.border = '#79b851';
                    }
                    ROW.appendChild(SPAN);
                }
                GRID.appendChild(ROW);
                terminar("<h1>GANASTE!😀</h1>")
                return
            } else {
                for (let i in palabra){
                    // creamos el spam con la clase letter para mostrar los colores
                    const SPAN = document.createElement('div');
                    SPAN.className = 'row-letter';
        
                    // Preguntamos si coinciden las mismas posiciones de las letras
                    if (INTENTO[i] === palabra[i]){
        
                        // Si coinciden cambiamos el color de span
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = '#79b851';
                        SPAN.style.border = '#79b851';
        
                        // Preguntamos si es que incluye la letra en cualquiera de las posiciones
                    } else if( palabra.includes(INTENTO[i]) ) {
                        // span yellow
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = '#f3c237';
                        SPAN.style.border = '#f3c237';
        
                    } else {
                        // span gris
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = '#a4aec4';
                        SPAN.style.border = '#a4aec4';
                        
                    }
                    // Injectamos dentro del div row
                    ROW.appendChild(SPAN);
                }
                 // por ultimo el div row ingresamos dentro del div
                GRID.appendChild(ROW);
                // borramos lo que hay dentro del imput
                input.value = "";
                // Por cada for ejecutado se esta un intento
                    intentos--;
                    VIDA.innerHTML = intentos;
                if (intentos==0){
                    terminar("<h3>PERDISTE!😖 La palabra era "+ palabra + "</h3>")
                }
            }

        } else {
            alert("Solo ingrese letras");
        }

        // Creamos la función terminar en caso de que si ganamos o perdemos
        function terminar(mensaje){
            input.disabled = true;
            let contenedor = document.getElementById('guesses');
            contenedor.innerHTML = mensaje;
            button.innerText = "Reiniciar";
            button.addEventListener("click", ()=>{
                GRID.innerHTML = "";
                location.reload();
            });
        }
        
    }

    function leerIntento(){
        let intento = document.getElementById("guess-input");
        intento = intento.value;
        intento = intento.toUpperCase(); 
        return intento;
    }
    
    
    // evento que va allamar a la funcion intento
    button.addEventListener("click", intentar);

   
      
}
