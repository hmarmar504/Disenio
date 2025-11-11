const fechaLuz = document.getElementById("fechaLuz");
const lineaLuz = document.getElementById("lineaLuz");
const infoPrecioBajo= document.getElementById("precioBajo");
const infoPrecioMedio = document.getElementById("precioMedio");
const infoPrecioAlto = document.getElementById("precioAlto");
const infoTramoEconomico = document.getElementById("tramoEconomico");
const lista = document.getElementById("lista");
let infoPreciosHora = [];
let infoPreciosConsumo = [];
infoPrecios.forEach(element => {
    infoPreciosHora.push(element.hora);
    infoPreciosConsumo.push(element.consumo)
});
console.log(infoPreciosHora)
console.log(infoPreciosConsumo)
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
};
function mejorTramo(){
    let conjuntos = [];
    let ultimo = -1;
    //Encontramos los tramos existentes
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
    //Identificamos el tramo mas largo
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
    //Calculamos la media de esas horas
    for(let i = 0; i < repeticiones; i++){
        
    };
    //Colocamos el mayor en su sitio
    infoTramoEconomico.innerHTML = '<p>'+horaInicio+'-'+horaFinal+'</p> <p class="verde">0.11 €/kWh</p>'
};
function precioMedioDia(){
    let suma = 0;
    for(let i = 0; i< infoPrecios.length; i++){
        suma += +infoPrecios[i].consumo;
    }
    let media = (suma/infoPrecios.length).toFixed(4);
    infoPrecioMedio.innerHTML = '<p>'+media+'</p><p>€/kWh</p>';
}
function precioBajoDia(){
    let bajo = Math.min(...infoPrecios.map(p => +p.consumo));
    let hora = infoPrecios.find(p => +p.consumo === bajo).hora;
    infoPrecioBajo.innerHTML = '<p>'+hora+'-'+(+hora+1)+'h</p><p class="verde">'+bajo+' €/kWh</p>';
}
function precioAltoDia(){
    let alto = Math.max(...infoPrecios.map(p => +p.consumo));
    let hora = infoPrecios.find(p => +p.consumo ===alto).hora;
    infoPrecioAlto.innerHTML = '<p>'+hora+'-'+(+hora+1)+'h</p><p class="rojo">'+alto+'€/kWh</p>';
}
function listaConsumo(){
    infoPrecios.forEach((precio , indice) =>{
        let bloque = document.createElement("div");
        if(precio.consumo*100<10){
            let bola = document.createElement("div");
            bola.setAttribute("class","bolaColor fondoVerde");
            bloque.appendChild(bola);
            let p = document.createElement("p");
            p.innerHTML = precio.hora+":00" +" - "+(+precio.hora+1)+":00";
            bloque.appendChild(p);
            let p2 = document.createElement("p");
            p2.setAttribute("class","verde listaPrecio");
            p2.innerHTML = precio.consumo+" €/kWh";
            bloque.appendChild(p2);
        }
        else if(precio.consumo*100>20){
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
        else{
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
        lista.appendChild(bloque);
    })
}
console.log(infoPrecios)
barraColores();
mejorTramo();
precioMedioDia();
precioBajoDia();
precioAltoDia();
listaConsumo();
