//
//Objetos del DOM que cambiaremos
//
const fechaLuz = document.getElementById("fechaLuz");
const lineaLuz = document.getElementById("lineaLuz");
const infoPrecioBajo= document.getElementById("precioBajo");
const infoPrecioMedio = document.getElementById("precioMedio");
const infoPrecioAlto = document.getElementById("precioAlto");
const infoTramoEconomico = document.getElementById("tramoEconomico");
const lista = document.getElementById("lista");

const tituloBarra = document.querySelectorAll(".fecha");
const selectDia = document.getElementById("select");
//
//Datos horas y consumo(Usados para la grafica)
//
let infoPreciosHora = [];
let infoPreciosConsumo = [];
infoPrecios.forEach(element => {
    infoPreciosHora.push(element.hora);
    infoPreciosConsumo.push(element.consumo)
});

//
//Cargamos los datos al select
//
function cargarSelect(){
    infoNumeroDias.forEach(element =>{
        console.log(selectDia.options)
        console.log(element);
        selectDia.options.add(new Option(element.dia));
    });
}
//
//Barra de colores de la primera parte
//
function barraColores(){
    for(let i = 0 ;i < infoPrecios.length; i++){
        let bloque = document.getElementById("tabla"+i);
        if(infoPrecios[i].consumo*100<10){
            bloque.setAttribute("style", "background-color:var(--colorVerde);");
        }
        else if(infoPrecios[i].consumo*100>20){
            bloque.setAttribute("style","background-color:var(--colorRojo);");
        }
        else{
            bloque.setAttribute("style","background-color:var(--colorNaranja);");
        }
    }
    //Metemos tambien el contenido del titulo en esta parte
    tituloBarra.forEach((element) => element.innerHTML = infoPrecios[0].dia)
};
//
//Parte del ¿Sabias que?
//
function mejorTramo(){
    let conjuntos = [];
    let ultimo = -1;
    //
    //Encontramos los tramos existentes
    //
    for(let i = 0; i < infoPrecios.length; i++) {
        if(infoPrecios[i].consumo*100<10){
            if(i!=0 && infoPrecios[i-1].consumo*100<10){
                conjuntos[ultimo][1]++;
            }
            else{
                conjuntos.push([infoPrecios[i].hora, 1]);
                ultimo++;
            }
        }
    };
    //
    //Identificamos el tramo mas largo
    //
    let repeticiones = 0;
    let mayor;
    for(let i = 0; i< conjuntos.length; i++){
        if(conjuntos[i][1]>repeticiones){
            repeticiones = conjuntos[i][1];
            mayor = i;
        }
    };
    let horaInicio = +conjuntos[mayor][0];
    let horaFinal = horaInicio+repeticiones;
    //
    //Calculamos la media de esas horas
    //
    for(let i = 0; i < repeticiones; i++){
        
    };
    //
    //Colocamos el mayor en su sitio
    //
    infoTramoEconomico.innerHTML = '<p>'+horaInicio+':00 - '+horaFinal+':00</p> <p class="verde">0.11 €/kWh</p>'
};
//
//Calculo del precio medio del dia
//
function precioMedioDia(){
    let suma = 0;
    for(let i = 0; i< infoPrecios.length; i++){
        suma += +infoPrecios[i].consumo;
    }
    let media = (suma/infoPrecios.length).toFixed(4); //No nos colamos con los decimales
    infoPrecioMedio.innerHTML = '<p>'+media+'</p><p>€/kWh</p>';
}
//
//Precio minimo del dia
//
function precioBajoDia(){

    let bajo = Math.min(...infoPrecios.map(p => +p.consumo)); //Sacamos el consumo minimo
    let hora = infoPrecios.find(p => +p.consumo === bajo).hora; //Buscamos a que hora ha sido
    infoPrecioBajo.innerHTML = '<p>'+hora+':00 - '+(+hora+1)+':00</p><p class="verde">'+bajo+' €/kWh</p>'; //Lo colocamos en su bloque
}
//
//Precio maximo del dia
//
function precioAltoDia(){
    let alto = Math.max(...infoPrecios.map(p => +p.consumo)); //Sacamos el consumo maximo
    let hora = infoPrecios.find(p => +p.consumo ===alto).hora; //Buscamos a que hora ha sido
    infoPrecioAlto.innerHTML = '<p>'+hora+':00 - '+(+hora+1)+':00</p><p class="rojo">'+alto+'€/kWh</p>'; //Lo colocamos en su bloque
}
//
//Listita con los colores
//
function listaConsumo(){
    
    infoPrecios.forEach((precio , indice) =>{ //Recorremos los datos
        let bloque = document.createElement("div"); //Creamos un bloque para el dato actual

        //De que color es?
        if(precio.consumo*100<10){//Verde

            //Creamos el puntito, le ponemos color y lo anclamos al bloque
            let bola = document.createElement("div");
            bola.setAttribute("class","bolaColor fondoVerde");
            bloque.appendChild(bola);

            //Lo mismo con el texto de la hora
            let p = document.createElement("p");
            p.innerHTML = precio.hora+":00" +" - "+(+precio.hora+1)+":00";
            bloque.appendChild(p);

            //Lo mismo con el precio
            let p2 = document.createElement("p");            
            p2.setAttribute("class","verde listaPrecio");
            p2.innerHTML = precio.consumo+" €/kWh";
            bloque.appendChild(p2); 
        }
        //
        //HACEMOS LO MISMO PARA LOS OTROS DOS CASOS(Creamos, ajustamos y anclamos)
        //
        else if(precio.consumo*100>20){//Rojo

            let bola = document.createElement("div");
            bola.setAttribute("class","bolaColor fondoRojo");
            bloque.appendChild(bola);

            let p = document.createElement("p");
            p.innerHTML = precio.hora+":00" +" - "+(+precio.hora+1)+":00";
            bloque.appendChild(p);

            let p2 = document.createElement("p");
            p2.setAttribute("class","rojo listaPrecio");
            p2.innerHTML = precio.consumo+" €/kWh";

            bloque.appendChild(p2);
        }
        else{//Naranja/Amarillo

            let bola = document.createElement("div");
            bola.setAttribute("class","bolaColor fondoNaranja");
            bloque.appendChild(bola);

            let p = document.createElement("p");
            p.innerHTML = precio.hora+":00" +" - "+(+precio.hora+1)+":00";
            bloque.appendChild(p);

            let p2 = document.createElement("p");
            p2.setAttribute("class","naranja listaPrecio");
            p2.innerHTML = precio.consumo+" €/kWh";

            bloque.appendChild(p2);
        }
        //Anclamos el bloque entero a la lista de bloques
        lista.appendChild(bloque);
    })
}
cargarSelect();
barraColores();
mejorTramo();
precioMedioDia();
precioBajoDia();
precioAltoDia();
listaConsumo();
//Grafica (Basicamente copia/pega del ejercicio de la grafica, pero cambiando el label y el data)
const myChart = document.getElementById("myChart");

const data = {
    //Mapeamos las horas
    labels: infoPreciosHora.map(h => h+':00-'+h+1+':00'),
    datasets: [{
        type: 'line',
        label: 'Consumo (€/kWh)',
        //Lo mismo con el consumo
        data: infoPreciosConsumo.map(v => parseFloat(v)),
        backgroundColor: '#c9d8fa',
        borderColor: '#015aa3',
        borderWidth: 1,
        tension: 0.2
    }]
};

new Chart(myChart, {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: false //Que no empiece a 0, que sino queda feo
            }
        }
    }
});