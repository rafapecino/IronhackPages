let iconos = []
let selecciones = []
let temporizador = 0
let tiempo = 0;
let intentos = 0;

generarTablero()

function cargarIconos() {
    iconos = []
    iconos[0] = "🍎"
    iconos[1] = "🍌"
    iconos[2] = "🍒"
    iconos[3] = "🍓"
    iconos[4] = "🍑"
    iconos[5] = "🍍"
    iconos[6] = "🍇"
    iconos[7] = "🍊"
    iconos[8] = "🍋"
    iconos[9] = "🍉"
    iconos[10] = "🍏"
    iconos[11] = "🥝"
}

function generarTablero() {
    cargarIconos()
    selecciones = []
    tiempo = 0
    iniciarCronometro();
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < 24; i++) {
        tarjetas.push(`
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
        `)
        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
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
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []
        intentos++;
        // Actualiza el elemento HTML donde muestras los intentos
        document.getElementById("intentos").textContent = intentos;
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
        } else {
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
        }
        // Verifica si se completó el juego comparando la longitud de las selecciones con el número total de tarjetas
        if (selecciones.length === 24) {
            detenerCronometro();
            // Aquí puedes realizar cualquier acción adicional cuando se completa el juego
        }
    }, 1000);
}
