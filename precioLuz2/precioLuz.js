// Elementos del DOM
const infoPrecioBajo = document.getElementById("precioBajo");
const infoPrecioMedio = document.getElementById("precioMedio");
const infoPrecioAlto = document.getElementById("precioAlto");
const infoTramoEconomico = document.getElementById("tramoEconomico");
const lista = document.getElementById("lista");

const tituloBarra = document.querySelectorAll(".fecha");
const selectDia = document.getElementById("select");

if (!Array.isArray(infoPrecios) || infoPrecios.length === 0) {
    // No hay datos: evitamos errores JS.
    console.warn("No hay datos para mostrar.");
} else {
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
        selectDia.options.add(new Option(element.dia));
    });
}
//
//Barra de colores de la primera parte
//
function barraColores(){
    for(let i = 0 ;i < infoPrecios.length; i++){
        let bloque = document.getElementById("tabla"+i);

        // limpiamos clases previas
        bloque.classList.remove("bg-success", "bg-warning", "bg-danger");

        // umbrales: < 0,10 -> verde | > 0,20 -> rojo | resto -> amarillo
        const v = +infoPrecios[i].consumo;
        if(v < 0.10){
            bloque.classList.add("bg-success");
        }
        else if(v > 0.20){
            bloque.classList.add("bg-danger");
        }
        else{
            bloque.classList.add("bg-warning");
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

    // Tramos con precio "verde" (por debajo de 0,10 €/kWh).
    // Guardamos índice de inicio + longitud.
    for(let i = 0; i < infoPrecios.length; i++) {
        if(+infoPrecios[i].consumo < 0.10){
            if(i !== 0 && (+infoPrecios[i-1].consumo < 0.10)){
                conjuntos[ultimo][1]++;
            } else {
                conjuntos.push([i, 1]);
                ultimo++;
            }
        }
    }

    // Si no hay tramos "verdes", usamos la hora más barata.
    if (conjuntos.length === 0) {
        const bajo = Math.min(...infoPrecios.map(p => +p.consumo));
        const hora = infoPrecios.find(p => +p.consumo === bajo).hora;
        infoTramoEconomico.innerHTML = `
            <div class="fs-4 fw-bold">${hora}:00 - ${(+hora+1)}:00</div>
            <div class="text-success fw-semibold">${bajo} €/kWh</div>
        `;
        return;
    }
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
    const startIdx = conjuntos[mayor][0];
    const horaInicio = +infoPrecios[startIdx].hora;
    const horaFinal = horaInicio + repeticiones;

    // Media del tramo
    let suma = 0;
    for (let i = 0; i < repeticiones; i++) {
        const idx = startIdx + i;
        if (infoPrecios[idx]) suma += +infoPrecios[idx].consumo;
    }
    const mediaTramo = (suma / repeticiones).toFixed(4);

    infoTramoEconomico.innerHTML = `
        <div class="fs-4 fw-bold">${horaInicio}:00 - ${horaFinal}:00</div>
        <div class="text-success fw-semibold">${mediaTramo} €/kWh</div>
    `;
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
    infoPrecioMedio.innerHTML = `<div class="fs-3 fw-bold">${media}</div><div class="text-body-secondary">€/kWh</div>`;
}
//
//Precio minimo del dia
//
function precioBajoDia(){

    let bajo = Math.min(...infoPrecios.map(p => +p.consumo)); //Sacamos el consumo minimo
    let hora = infoPrecios.find(p => +p.consumo === bajo).hora; //Buscamos a que hora ha sido
    infoPrecioBajo.innerHTML = `<div class="fs-4 fw-bold">${hora}:00 - ${(+hora+1)}:00</div><div class="text-success fw-semibold">${bajo} €/kWh</div>`;
}
//
//Precio maximo del dia
//
function precioAltoDia(){
    let alto = Math.max(...infoPrecios.map(p => +p.consumo)); //Sacamos el consumo maximo
    let hora = infoPrecios.find(p => +p.consumo ===alto).hora; //Buscamos a que hora ha sido
    infoPrecioAlto.innerHTML = `<div class="fs-4 fw-bold">${hora}:00 - ${(+hora+1)}:00</div><div class="text-danger fw-semibold">${alto} €/kWh</div>`;
}
//
//Listita con los colores
//
function listaConsumo(){

    // limpiamos
    lista.innerHTML = "";

    infoPrecios.forEach((precio) => {
        const v = +precio.consumo;
        const colorClass = v < 0.10 ? "bg-success" : (v > 0.20 ? "bg-danger" : "bg-warning");
        const textClass = v < 0.10 ? "text-success" : (v > 0.20 ? "text-danger" : "text-warning");

        const item = document.createElement("div");
        item.className = "list-group-item d-flex align-items-center gap-2";

        const dot = document.createElement("span");
        dot.className = `dot rounded-circle ${colorClass}`;

        const hora = document.createElement("div");
        hora.className = "me-auto";
        hora.textContent = `${precio.hora}:00 - ${(+precio.hora+1)}:00`;

        const precioEl = document.createElement("div");
        precioEl.className = `fw-semibold ${textClass}`;
        precioEl.textContent = `${precio.consumo} €/kWh`;

        item.appendChild(dot);
        item.appendChild(hora);
        item.appendChild(precioEl);
        lista.appendChild(item);
    });
}
    cargarSelect();
    selectDia.value = infoPrecios[0].dia;

    barraColores();
    mejorTramo();
    precioMedioDia();
    precioBajoDia();
    precioAltoDia();
    listaConsumo();

    // Gráfica (Chart.js)
    const myChart = document.getElementById("myChart");
    const data = {
        labels: infoPreciosHora.map(h => `${h}:00-${(+h + 1)}:00`),
        datasets: [{
            type: "line",
            label: "Precio (€/kWh)",
            data: infoPreciosConsumo.map(v => parseFloat(v)),
            borderWidth: 1,
            tension: 0.2
        }]
    };

    new Chart(myChart, {
        type: "line",
        data,
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}