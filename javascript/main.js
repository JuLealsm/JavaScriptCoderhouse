

const plantas = [
    {nombre: 'Helecho',flores: 'flores-false', tamano: 'pequena',toxica: 'toxica-false',luzSolar: 'sombra'},
    {nombre: 'Calathea',flores: 'flores-true',tamano: 'pequena',toxica: 'toxica-false',luzSolar: 'sombra'},
    {nombre: 'Ficus', flores: 'flores-true', tamano: 'grande',toxica: 'toxica-true', luzSolar: 'sombra'},
    {nombre: 'Camelia',flores: 'flores-true', tamano: 'grande',toxica: 'toxica-true',luzSolar: 'sombra'},
    {nombre: 'Peperomia', flores: 'flores-true', tamano: 'pequena',toxica: 'toxica-false',luzSolar: 'sombra'},
    {nombre: 'Hierba Limon',flores: 'flores-false' ,tamano: 'grande',toxica: 'toxica-true',luzSolar:'solPleno'},
    {nombre: 'Lavanda',flores: 'flores-true' ,tamano: 'grande',toxica: 'toxica-true',luzSolar:'solPleno' },
    {nombre: 'Romero',flores: 'flores-true',tamano: 'pequena', toxica:'toxica-false' ,luzSolar:'solPleno' },
    {nombre: 'Girasol',flores: 'flores-true',tamano: 'pequena' ,toxica:'toxica-false' ,luzSolar: 'solPleno'},
    {nombre: 'Planta del Dinero',flores: 'flores-false' ,tamano:'pequena' ,toxica:'toxica-false' ,luzSolar: 'solPleno'},
    {nombre: 'Magnolia',flores: 'flores-true', tamano: 'grande', toxica: 'toxica-false', luzSolar: 'sombraParcial'},
    {nombre: 'Begonia',flores: 'flores-true', tamano: 'pequena', toxica: 'toxica-true', luzSolar:'sombraParcial'},
    {nombre: 'Palma Areca',flores: 'flores-false', tamano: 'grande', toxica: 'toxica-false', luzSolar: 'sombraParcial'},
    {nombre: 'Hosta',flores: 'flores-true', tamano: 'pequena', toxica: 'toxica-true', luzSolar:'sombraParcial'},
    {nombre: 'Orquídea Mariposa',flores: 'flores-true', tamano: 'pequena', toxica: 'toxica-false', luzSolar:'sombraParcial'},
    {nombre: 'Calathea orbifolia',flores: 'flores-true', tamano: 'pequena', toxica: 'toxica-false', luzSolar: 'sombraParcial'}
]

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

//selecciona todos los inputs de cada pregunta del quizz +  llama la funcion 'anadirListener' 
let inputSol = document.querySelectorAll('input[name="luzSolar"]');
anadirListener(inputSol);

let inputTamano = document.querySelectorAll('input[name="tamano"]');
anadirListener(inputTamano);

let inputFlores = document.querySelectorAll('input[name="flores"]');
anadirListener(inputFlores);

let inputToxica = document.querySelectorAll('input[name="toxica"]');
anadirListener(inputToxica);

//filtra el elemento del array 'plantas' que sea igual al objeto 'respuestas'
function resultado(respuestas) {
    return plantas.filter(planta =>
        planta.luzSolar === respuestas.luzSolar &&
        planta.tamano === respuestas.tamano &&
        planta.flores === respuestas.flores &&
        planta.toxica === respuestas.toxica
    );
}

//check si el objeto respuestas no esta vacío para generar un parrafo con el plantas.nombre encontrado el la funcion 'resultado'
function simular() {
    const plantaIdeal = resultado(respuestas);
    const exhibirResultado = document.getElementById('parrafo-resultado');

    if (plantaIdeal.length > 0) {
        exhibirResultado.innerHTML = `
            <p>Su planta ideal es: ${plantaIdeal.map(p => p.nombre).join(", ")}</p>
        `;
    } else {
        exhibirResultado.innerHTML = `<p>No se encontró ninguna planta ideal para las selecciones.</p>`;
    }
}

//Cuando el usuario hace click en el boton el parrafo con la respuesta es generado.  
document.getElementById('btn-simular').addEventListener('click', simular);
