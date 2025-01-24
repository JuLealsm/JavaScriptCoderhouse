

const plantasSombra = ["Helecho", "Calathea", "Ficus", "Camelia"];
const plantasSol = ["Hierba Limon", "Lavanda", "Romero", "Girasol"];
const plantasSombraParcial = ["Hortencia", "Begonia", "Palma Areca", "Hosta"];

/*plantas pequenas: plantasSombra["Helecho", "Calathea"]
                    plantasSol ["Romero", "Girasol"]
                    plantasSombraParcial ["Hosta"]
plantas con flores: plantasSombra[Camelia]
                    plantasSol ["Lavanda", "Romero", "Girasol"]
                    plantasSombraParcial ["Hortencia", "Begonia",]
plantas no toxicas: plantasSombra["Helecho", "Calathea"]
                    plantasSol ["Romero", "Girasol"]
                    plantasSombraParcial ["Palma Areca"]*/

const preguntas = [ "El lugar deseado para colocar la planta recibe más de 8 horas de luz solar al día?","El lugar deseado para colocar la planta recibe al menos de 4 horas de luz solar al día?", "Prefieres una planta pequeña?", "Te gustaría tener una planta que produzca flores?", "Tienes una mascota que tenga acceso a la planta?" ];

let respuestas = [];


function preguntar (){
    for (let i=0; i<preguntas.length; i++){
        let respuesta = prompt (preguntas [i]);


        //para garantizar que la respuesta sea apenas si o no
        while (respuesta !== "si" && respuesta !== "no"){  
            alert("Por favor, responda apenas con 'si' o 'no'.");
            respuesta = prompt (preguntas [i]);
        }


        if (i === 0 && respuesta === "si"){    //si la respuesta de la pregunta [0] es si...
            respuestas.push(respuesta);
            i++;                              //saltea la pregunta [1]
        }
        respuestas.push(respuesta);
    }

}


function resultado() {
    if (respuestas[0]=== "si" && respuestas[2]=== "si" && respuestas[3] === "si" && respuestas[4] === "si"){       //plantas sol
        return plantasSol[2];
    }else if (respuestas[0]=== "si" && respuestas[2]=== "si" && respuestas[3] === "si" && respuestas[4] === "no"){ //plantas sol
        return [plantasSol[1], plantasSol[2]];
    }else if (respuestas[0]=== "si" && respuestas[2]=== "si" && respuestas[3] === "no" && respuestas[4] === "si"){ //plantas sol
        return null;
    }else if (respuestas[0]=== "si" && respuestas[2]=== "si" && respuestas[3] === "no" && respuestas[4] === "no"){ //plantas sol
        return null;
    }else if (respuestas[0]=== "si" && respuestas[2]=== "no" && respuestas[3] === "si" && respuestas[4] === "si"){ //plantas sol
        return plantasSol[3];
    }else if (respuestas[0]=== "si" && respuestas[2]=== "no" && respuestas[3] === "si" && respuestas[4] === "no"){ //plantas sol
        return  plantasSol[3];
    }else if (respuestas[0]=== "si" && respuestas[2]=== "no" && respuestas[3] === "no" && respuestas[4] === "si"){ //plantas sol
        return plantasSol[0];
    }else if (respuestas[0]=== "si" && respuestas[2]=== "no" && respuestas[3] === "no" && respuestas[4] === "no"){ //plantas sol
        return plantasSol[0];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "si" && respuestas[2]=== "si" && respuestas[3] === "si" && respuestas[4] === "si"){ //plantas de sombra parcial
        return null;
    }else if (respuestas[0]=== "no" && respuestas[1]=== "si" && respuestas[2]=== "si" && respuestas[3] === "si" && respuestas[4] === "no"){ //plantas de sombra parcial
        return plantasSombraParcial[1];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "si" && respuestas[2]=== "si" && respuestas[3] === "no" && respuestas[4] === "si"){ //plantas de sombra parcial
        return null;
    }else if (respuestas[0]=== "no" && respuestas[1]=== "si" && respuestas[2]=== "si" && respuestas[3] === "no" && respuestas[4] === "no"){ //plantas de sombra parcial
        return plantasSombraParcial[3];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "si" && respuestas[2]=== "no" && respuestas[3] === "si" && respuestas[4] === "si"){ //plantas de sombra parcial
        return null;
    }else if (respuestas[0]=== "no" && respuestas[1]=== "si" && respuestas[2]=== "no" && respuestas[3] === "si" && respuestas[4] === "no"){ //plantas de sombra parcial
        return plantasSombraParcial[0];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "si" && respuestas[2]=== "no" && respuestas[3] === "no" && respuestas[4] === "si"){ //plantas de sombra parcial
        return plantasSombraParcial[2];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "si" && respuestas[2]=== "no" && respuestas[3] === "no" && respuestas[4] === "no"){ //plantas de sombra parcial
        return plantasSombraParcial[2];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "no" && respuestas[2]=== "si" && respuestas[3] === "si" && respuestas[4] === "si"){ //plantas de sombra
        return null;
    }else if (respuestas[0]=== "no" && respuestas[1]=== "no" && respuestas[2]=== "si" && respuestas[3] === "si" && respuestas[4] === "no"){ //plantas de sombra
        return null;
    }else if (respuestas[0]=== "no" && respuestas[1]=== "no" && respuestas[2]=== "si" && respuestas[3] === "no" && respuestas[4] === "si"){ //plantas de sombra
        return [plantasSombra[0], plantasSombra[1]];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "no" && respuestas[2]=== "si" && respuestas[3] === "no" && respuestas[4] === "no"){ //plantas de sombra
        return [plantasSombra[0], plantasSombra[1]];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "no" && respuestas[2]=== "no" && respuestas[3] === "si" && respuestas[4] === "si"){ //plantas de sombra
        return null;
    }else if (respuestas[0]=== "no" && respuestas[1]=== "no" && respuestas[2]=== "no" && respuestas[3] === "si" && respuestas[4] === "no"){ //plantas de sombra
        return plantasSombra[3];
    }else if (respuestas[0]=== "no" && respuestas[1]=== "no" && respuestas[2]=== "no" && respuestas[3] === "no" && respuestas[4] === "si"){ //plantas de sombra
        return null; 
    }else if (respuestas[0]=== "no" && respuestas[1]=== "no" && respuestas[2]=== "no" && respuestas[3] === "no" && respuestas[4] === "no"){ //plantas de sombra
        return plantasSombra[2];
    }
        

}

//simulando

function simular(){
    preguntar();
    const plantaIdeal = resultado();
    if (plantaIdeal === null){
        alert ("No se encontró ninguna planta con estas características. Inténtalo de nuevo cambiando una de tus respuestas.");
    }else{
        alert(" Su planta ideal es " + plantaIdeal);
    }

    }

simular();