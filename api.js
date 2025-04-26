/* function personaje(recibido){
const resultado = fetch("https://rickandmortyapi.com/api/character");
resultado
.then(respuesta=>respuesta.json())
.then(console.log(respuesta))

}
*/


const URL = 'https://rickandmortyapi.com/api/character/';


    async function ObtenerPersonajes() {
        const respuesta = await fetch(URL + aleatorio());
        const data = await respuesta.json();
        return data; // Directly returns the data
    }

    /* async function ObtenerPrimeraVezVisto(link) {
        const respuesta = await fetch(link);
        const data = await respuesta.json();
        console.log(data.name);
        return data.name;
    } */

      /*   function ObtenerPrimeraVezVisto(link) {
            const resultado = fetch(link);
            resultado
                .then(respuesta => respuesta.json())
                .then(datos => {
                    return datos.name; // Se usa dentro de una función de flecha con llaves
                });
        } */

               /*  function ObtenerPrimeraVezVisto(link) {
                    const resultado = fetch(link);
                    resultado
                        .then(respuesta => respuesta.json())
                        .then(datos => {
                            let hola = datos.name
                            return hola; // Se usa dentro de una función de flecha con llaves
                        });
                } */
                

  /*   ObtenerPersonajes().then(ans => {
        document.getElementById('nombre').innerHTML = ans.name;
        document.getElementById('estado').innerHTML = ans.status;
        document.getElementById('especie').innerHTML = " - " + ans.species;
        document.getElementById('foto').src = ans.image;
    }); */
    

function aleatorio(){
    let numero = Math.floor(Math.random()*826);
    return numero;
}

function EstadoColor(estado){
    switch(estado){
        case "Alive":
            return 1;
            break;
        case "Dead":
            return 2;
            break;
        default:
            return 0;
    }
}
async function ObtenerPrimeraVezVisto(link) {
    const respuesta = await fetch(link);
    const datos = await respuesta.json();
    return datos.name;
}
// Uso fuera de la función:

function generarCards(data,episodio) {
    const contenedor = document.getElementById('miContenedor'); // Contenedor principal
    contenedor.innerHTML = ''; // Limpiar contenido previo
   // personajeEpisode.forEach(elemento => console.log(elemento));
    data.forEach((personaje,index) => {
        // Crear el div para la card
        const card = document.createElement('div');
        card.className = 'card';
       let estado = EstadoColor(personaje.status)

        // Crear la estructura interna de la card
        card.innerHTML = `
            <div class="card_img">
                <img alt="imagen" src="${personaje.image}">
            </div>
               <div class="card_info">
            <div class="card_title">
            <a href="${personaje.url}">
                <h2>${personaje.name}</h2>
            </a>
            </div>

             <div class="card_text">
            <img src="${estado}.svg" class="img_estado">
                <span> 
                ${personaje.status} - ${personaje.species}</span>
            </div>
            <h4>Last known location:</h4>
              <a href="${personaje.location.url}"> 
              <span>${personaje.location.name}</span>
              </a>
            <h4>First seen in:</h4>
             <a href="${personaje.episode}">
             <span>${episodio[index]}</span>
             </a>
            </div>
        `;
        // Añadir la card al contenedor
        contenedor.appendChild(card);
    });
}

/* const personajesData = [];
const personajeEpisode =[];
let cantidad_cartas = 7
for (let i = 0; i < cantidad_cartas; i++) {
    ObtenerPersonajes().then(ans=>{
        personajesData.push(ans);

        ObtenerPrimeraVezVisto(ans.episode)
        .then(nombre => {
          personajeEpisode.push(nombre);
        });
       

        if (personajesData.length === cantidad_cartas) { // Esperar a que se carguen los 4
            generarCards(personajesData,personajeEpisode);// Llamar a generarCards
        }
    });
} */
    const cantidad_cartas = 4;

    async function cargarYMostrarPersonajes() {
        const personajesData = [];
        const personajeEpisode = [];
    
        for (let i = 0; i < cantidad_cartas; i++) {
            const personaje = await ObtenerPersonajes(); // Esperamos cada personaje
            personajesData.push(personaje);
    
            const nombreEpisodio = await ObtenerPrimeraVezVisto(personaje.episode[0]); // primer episodio
            personajeEpisode.push(nombreEpisodio);
        }
    
        generarCards(personajesData, personajeEpisode);
    }
    
    // Llamar a la función principal
    cargarYMostrarPersonajes();
    







 
