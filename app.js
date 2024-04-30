let iconos = [];
let selecciones = [];
let temporizador = 0;
let tiempo = 0;
let intentos = 0;

// Genera el tablero inicial
generarTablero();

function cargarIconos() {
    iconos = [
        "🍎", "🍌", "🍒", "🍓", "🍑", "🍍", "🍇", "🍊", "🍋", "🍉", "🍏", "🥝"
    ];
}

function generarTablero() {
    // Detener el cronómetro antes de generar un nuevo tablero
    detenerCronometro();
    tiempo = 0; // Restablecer el tiempo a cero
    intentos = 0; // Restablecer los intentos a cero

    cargarIconos();
    selecciones = [];
    const tablero = document.getElementById("tablero");
    const tarjetas = [];

    for (let i = 0; i < 24; i++) {
        tarjetas.push(crearTarjeta(i));
        if (i % 2 === 1) {
            iconos.splice(0, 1);
        }
    }

    tarjetas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = tarjetas.join(" ");
    // Actualiza el elemento HTML donde muestras los intentos
    document.getElementById("intentos").textContent = intentos;
    // Iniciar el cronómetro después de generar el tablero
    iniciarCronometro();
}

function crearTarjeta(i) {
    return `
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    <i class="far fa-question-circle"></i>
                </div>
            </div>
        </div>
    `;
}

function iniciarCronometro() {
    temporizador = setInterval(() => {
        tiempo++;
        // Actualiza el elemento HTML donde muestras el tiempo
        document.getElementById("tiempo").textContent = tiempo;
    }, 1000);
}

// Función para detener el cronómetro
function detenerCronometro() {
    clearInterval(temporizador);
}

function seleccionarTarjeta(i) {
    const tarjeta = document.getElementById("tarjeta" + i);
    if (tarjeta.style.transform !== "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }
    if (selecciones.length === 2) {
        deseleccionar(selecciones);
        selecciones = [];
        intentos++;
        // Actualiza el elemento HTML donde muestras los intentos
        document.getElementById("intentos").textContent = intentos;
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        const trasera1 = document.getElementById("trasera" + selecciones[0]);
        const trasera2 = document.getElementById("trasera" + selecciones[1]);
        if (trasera1.innerHTML !== trasera2.innerHTML) {
            const tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
            const tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
        } else {
            trasera1.style.background = "plum";
            trasera2.style.background = "plum";
        }
        // Verifica si se completó el juego comparando la longitud de las selecciones con el número total de tarjetas
        if (selecciones.length === 24) {
            detenerCronometro();
            // Aquí puedes realizar cualquier acción adicional cuando se completa el juego
        }
    }, 1000);
}

// Nuevo método para reiniciar el juego
function reiniciarJuego() {
    generarTablero();
}
