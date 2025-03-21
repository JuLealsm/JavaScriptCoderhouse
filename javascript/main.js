const isQuizPage = window.location.pathname.includes("quiz.html");
const isGardenPage = window.location.pathname.includes("mi-jardin.html");
const isIndexPage = window.location.pathname.includes("index.html");

let plantas = [];
let plantasVerano = [];

async function getArrayPlantas(){
    try{
        const response = await fetch("../javascript/plantas.json");
        const data = await response.json();
        plantas = data;
    }catch(error){
        console.error("Error al cargar plantas del archivo plantas.JSON", error);
    }
}

async function getArrayPlantasEstacion(){
    try{
        const response = await fetch("../javascript/plantasVerano.json");
        const data = await response.json();
        plantasVerano = data;
        if (isIndexPage) {
            displayPlantasVerano();
        }
    }catch(error){
        console.error("Error al cargar plantas Verano del archivo plantasVerano.JSON", error);
    }
}

getArrayPlantas();
getArrayPlantasEstacion();

//*********************** INDEX.HTML ***********************//

// Funcion para mostrar las plantas de verano en el index.html
function displayPlantasVerano() {
    const mainContainer = document.querySelector(".season-plant-panel");
    
    if (!mainContainer) {
        return;
    }

    // Limpiar contenido existente para evitar duplicados
    mainContainer.innerHTML = '';

    plantasVerano.forEach((plant) => {
        const plantCard = document.createElement("div");
        plantCard.classList.add("season-plant-card");
        plantCard.innerHTML = `
            <h3>${plant.nombre}</h3>
            <button id="add-to-garden">
                <img src="images/icons/add-plant-icon.png" alt="imagen para el botón de añadir planta a mi jardín" title="Haz clic para añadir esta planta a tu jardín.">
            </button>
            <div class="season-plant-cardgrid">
                <p><span>${plant.nombreComun}</span></p>
                <img class="season-plant-image" src="images/${plant.imagen}" alt="Planta de verano: ${plant.nombreComun}">
                <p>${plant.descripcion}</p>
            </div>
        `;
        mainContainer.appendChild(plantCard);
    });

    // Add event listeners para los botones add-to-garden
    document.querySelectorAll("#add-to-garden").forEach((btn) => {
        btn.addEventListener("click", () => {
            const plant = btn.closest('.season-plant-card').querySelector('h3').textContent;
            addToGarden(plant);
            
        });
    });
    // Add event listeners para los modales en index.html
    addPlantModalListeners();
}

// Funcion reutilizable para crear modales de Sweet Alert para exhibir más informacion sobre la planta
function addPlantModalListeners() {
    document.querySelectorAll(".season-plant-cardgrid").forEach((card) => {
        card.addEventListener("click", () => {
            const plantCard = card.closest('.season-plant-card');
            const plantName = plantCard.querySelector('h3').textContent;
            const plant = plantas.find(p => p.nombre === plantName);
            const caracteristicas = `
                <p><strong class="modalCaracteristicas">Flores:</strong> ${plant.flores === "conFlores" ? "Sí 🌸" : "No ❌"}</p>
                <p><strong class="modalCaracteristicas">Tamanho:</strong> ${plant.tamano === "pequena" ? "Pequeña 🌱" : "Grande 🌳"}</p>
                <p><strong class="modalCaracteristicas">Tóxica:</strong> ${plant.toxica === "toxicaSi" ? "Sí ⚠️ (Cuidado con mascotas!)" : "No ✅"}</p>
                <p><strong class="modalCaracteristicas">Luz Solar:</strong> ${plant.luzSolar === "sombra" ? "Prefiere sombra ☁️" : plant.luzSolar === "solPleno" ? "Precisa de sol pleno ☀️" :"Aprecia sombra parcial 🌤️"
                }</p>
            `;
            
            if (plant) {
                Swal.fire({
                    title: plant.nombreComun,
                    html:  `
                    <p><strong class="modalNombre">${plant.nombre}</strong></p>
                    <p>${plant.descripcion}</p>
                    <hr>
                    <h3 class="modalCaracteristicasTitle"> Características🌿</h3>
                    ${caracteristicas}
                    `,
                    imageUrl: plant.photo,
                    imageWidth: 400,
                    imageHeight: 400,
                    imageAlt: plant.nombreComun,
                    confirmButtonColor: '#8A9743',
                    customClass: {
                        popup: "modalPersonalizado",
                        title: "modalTitle"
                    }
                });
            }
        });
    });
}

//*********************** QUIZ.HTML ***********************//

//Informaciones necesarias para generar elementos de las preguntas del quiz
const preguntas = [
    {   id: "luzSolar",
        pregunta: "El lugar deseado para colocar la planta recibe cuantas horas de luz del sol directa?",
        opciones: [
            { id: "solPleno", name :"luzSolar", texto: "8 horas o más", imagen: "../images/solPleno.png" },
            { id: "sombraParcial", name :"luzSolar", texto: "Al menos 4 horas", imagen: "../images/sombraParcial.png" },
            { id: "sombra", name :"luzSolar", texto: "No recibe luz solar", imagen: "../images/sombra.png" }
        ]
    },

    {   id: "tamano",
        pregunta: "Qué tamaño de planta prefieres?",
        opciones: [
            { id: "pequena", name :"tamano", texto: "Pequena", imagen: "../images/pequena.png" },
            { id: "grande", name :"tamano", texto: "Grande", imagen: "../images/grande.png" }
            
        ]
    },

    {   id: "flores",
        pregunta: "Te gustaría tener una planta que produzca flores?",
        opciones:[
            { id: "conFlores", name:"flores", texto: "Con flores", imagen: "../images/flores-true.png"},
            { id: "sinFlores", name :"flores", texto: "Sin flores", imagen: "../images/flores-false.png"}
        ]
    },

    {   id:"toxica",
        pregunta: "Tienes una mascota que tenga acceso a la planta?",
        opciones:[
            { id: "toxicaSi", name :"toxica", texto: "No", imagen: "../images/toxica-true.png"},
            { id: "toxicaNo", name:"toxica", texto: "Si", imagen: "../images/toxica-false.png"}
        ]
    }
];

//funcion para crear elementos HTML para las preguntas del quiz. 
function construirQuiz(){
    const main = document.querySelector(".quiz-main");

    preguntas.forEach(pregunta=>{
        const fieldset = document.createElement("fieldset");
        fieldset.classList.add("quiz-fieldset");
        fieldset.id = pregunta.id;

        const legend = document.createElement("legend");
        legend.textContent = pregunta.pregunta;
        fieldset.appendChild(legend);

        const divOptions = document.createElement("div");
        divOptions.classList.add("quiz-options");

        pregunta.opciones.forEach(opcion =>{
            const div = document.createElement("div");
            divOptions.appendChild(div);

            const input = document.createElement("input");
            input.id = opcion.id;
            input.name = opcion.name;
            input.type = "radio";
            input.classList.add("quiz-input");
            div.appendChild(input);

            const label = document.createElement("label");
            label.textContent = opcion.texto;
            label.setAttribute("for", opcion.id);
            div.appendChild(label);

            const imagen = document.createElement("img");
            imagen.src = opcion.imagen;
            imagen.classList.add("quiz-image");
            label.appendChild(imagen);

        })
        fieldset.appendChild(divOptions);
        main.insertBefore(fieldset, document.getElementById("btn-simular"));
    })
}

// para cargar apenas el codigo relacionado al quiz mientas este en la pagina del quiz
if (isQuizPage) {
    construirQuiz();
    
    //selecciona todos los inputs de cada pregunta del quiz + llama la funcion 'anadirListener' definida mas abajo
    let inputSol = document.querySelectorAll('input[name="luzSolar"]');
    anadirListener(inputSol);

    let inputTamano = document.querySelectorAll('input[name="tamano"]');
    anadirListener(inputTamano);

    let inputFlores = document.querySelectorAll('input[name="flores"]');
    anadirListener(inputFlores);

    let inputToxica = document.querySelectorAll('input[name="toxica"]');
    anadirListener(inputToxica);

    //Cuando el usuario hace click en el boton, el parrafo con la respuesta es generado con la funcion 'simular' definida mas abajo.  
    document.getElementById('btn-simular').addEventListener('click', simular);
}

let respuestas = {};

//funcion para determinar que el input que esta seleccionado deve ser anadido al objeto 'respuestas' en forma de clave=valor
function construirRespuestas() {
    const respuestaLuzSolar = document.querySelector('input[name="luzSolar"]:checked');
    const respuestaTamano = document.querySelector('input[name="tamano"]:checked');
    const respuestaFlores = document.querySelector('input[name="flores"]:checked');
    const respuestaToxica = document.querySelector('input[name="toxica"]:checked');

    if (respuestaLuzSolar) {
        respuestas.luzSolar = respuestaLuzSolar.id;
    }
    if (respuestaTamano) {
        respuestas.tamano = respuestaTamano.id;
    }
    if (respuestaFlores) {
        respuestas.flores = respuestaFlores.id;
    }
    if (respuestaToxica) {
        respuestas.toxica = respuestaToxica.id;
    }
}

//crea una funcion reutilizable para anadir eventListener sobre CADA UNO de los itens de una NodeList + llama la funcion 'construirRespuestas' 
function anadirListener(inputs) {
    inputs.forEach(input => {
        input.addEventListener('change', construirRespuestas);
    });
}

//filtra el elemento del array 'plantas' que sea igual al objeto 'respuestas'
function resultado(respuestas) {
    return plantas.filter(planta =>
        planta.luzSolar === respuestas.luzSolar &&
        planta.tamano === respuestas.tamano &&
        planta.flores === respuestas.flores &&
        planta.toxica === respuestas.toxica
    );
}


function simular() {
    // Comprueba si todas las respuestas fueron insertadas.
    if (Object.keys(respuestas).length < 4) {  
        Swal.fire({
            title: "Incompleto!",
            text: "Por favor, responda todas las preguntas.",
            icon: "warning"
        });
        return;
    }
    const plantaIdeal = resultado(respuestas);
    const exhibirResultado = document.getElementById('parrafo-resultado');

    //check si el objeto respuestas no esta vacío para generar un parrafo con el plantas.nombre encontrado el la funcion 'resultado'
    if (plantaIdeal.length > 0) {
        exhibirResultado.innerHTML = plantaIdeal.map(p => `
            <div class="season-plant-card">
                <h3>${p.nombre}</h3>
                <button id="add-to-garden">
                    <img src="../images/icons/add-plant-icon.png" alt="imagen para el botón de añadir planta a mi jardín" title="Haz clic para añadir esta planta a tu jardín.">
                </button>
                <div class="season-plant-cardgrid">
                    <img class="season-plant-image" src="${p.imagen}" alt="Resultado del quizz de Planta Ideal">
                    <p>${p.descripcion}</p>
                </div>
            </div>
        `).join("");

        // Add event listeners para el boton "add-to-garden"
        document.querySelectorAll("#add-to-garden").forEach((btn) => {
            btn.addEventListener("click", () => {
                const plant = btn.closest('.season-plant-card').querySelector('h3').textContent;
                addToGarden(plant);
                
            });
        });

        // Add event listeners para los modales en quiZ.html
        addPlantModalListeners();
    } else {
        exhibirResultado.innerHTML = `<p>No se encontró ninguna planta ideal para las selecciones. Intente otra vez con otra combinación de respuestas.</p>`;
    }
}

// para salvar las plantas en el local storage
function addToGarden(plant) {
    const garden = JSON.parse(localStorage.getItem("miJardin")) || [];
    const plantExists = garden.some(p => p.nombre === plant);

    if (!plantExists) {
        const plantInfo = plantas.find(p => p.nombre === plant);
        if (plantInfo) {
            garden.push(plantInfo);
            localStorage.setItem("miJardin", JSON.stringify(garden));
            Toastify({
                text: "🌱 La planta ha sido añadida a tu jardín!",
                position: "right",
                gravity: "top",
                duration: 5000,
                close: true,
                stopOnFocus: true,
                style: {
                    background: "#8A9743",
                    color: "white",
                    fontWeight: "bold"
                },
                offset: {
                    x: 20,
                    y: 20
                }
            }).showToast();
        }
    } else {
        Toastify({
            text: "⚠️ Esta planta ya se encuentra en tu jardín!",
            position: "right",
            gravity: "top",
            duration: 5000,
            close: true,
            stopOnFocus: true,
            style: {
                background: "#D9534F", // Vermelho para destaque
                color: "white",
                fontWeight: "bold"
            },
            offset: {
                x: 20,
                y: 20
            }
        }).showToast();
    }
}




//*********************** MI JARDIN.HTML ***********************//
if (isGardenPage) {
    const gardenContainer = document.querySelector("#garden");
    let garden = JSON.parse(localStorage.getItem("miJardin")) || [];
    
    if (garden.length === 0) {
        gardenContainer.innerHTML = "<p>No hay plantas en tu jardín todavía.</p>";
    } else {
        garden.forEach((savedPlant) => {
            const plant = plantas.find(p => p.nombre === savedPlant.nombre) || savedPlant;
            
            const plantCard = document.createElement("div");
            plantCard.classList.add("season-plant-card");
            plantCard.innerHTML = `
                <h3>${plant.nombre}</h3>
                <button id="remove-from-garden">
                    <img src="../images/icons/remove-plant-icon.png" alt="imagen para el botón de remover planta de mi jardín" title="Haz clic para remover esta planta de tu jardín.">
                </button>
                <div class="season-plant-cardgrid">
                    <img class="season-plant-image" src="${plant.imagen}" alt="${plant.nombre}">
                    <p>${plant.descripcion}</p>
                </div>
            `;
            gardenContainer.appendChild(plantCard);
        });
        // Add event listeners para el boton "remove-from-garden" con alerta de confirmacion
        document.querySelectorAll("#remove-from-garden").forEach((btn) => {
            btn.addEventListener("click", () => {
                const plantName = btn.closest('.season-plant-card').querySelector('h3').textContent;

                garden = garden.filter((plant) => plant.nombre !== plantName);
                localStorage.setItem("miJardin", JSON.stringify(garden));

                // Remover el card de la planta del DOM
                btn.closest('.season-plant-card').remove();

                Toastify({
                    text: "❌ La planta ha sido removida de tu jardín!",
                    position: "right",
                    gravity: "top",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        background: "#A15227",
                        color: "white",
                        fontWeight: "bold"
                    },
                    offset: {
                        x: 20,
                        y: 20
                    }
                }).showToast();

                if (garden.length === 0) {
                    gardenContainer.innerHTML = "<p>Tu jardín está vacío. Añade plantas para empezar a construirlo.</p>";
                }
            });
        });

        // Add event listeners para los modales en mi-jardin.html
        addPlantModalListeners();
    };
} 