const fechaLuz = document.getElementById("fechaLuz");
const lineaLuz = document.getElementById("lineaLuz");
const infoPrecioBajo= document.getElementById("precioBajo");
const infoPrecioMedio = document.getElementById("precioMedio");
const infoPrecioAlto = document.getElementById("precioAlto");
const infoTramoEconomico = document.getElementById("tramoEconomico");

function barraColores(){
    for(let i = 0 ;i < infoPrecios.length; i++){
        let bloque = document.getElementById("tabla"+i);
        if(infoPrecios[i].consumo*100<10){
            bloque.setAttribute("style", "background-color:green;");
        }
        else if(infoPrecios[i].consumo*100>20){
            bloque.setAttribute("style","background-color:red;");
        }
        else{
            bloque.setAttribute("style","background-color:yellow;");
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
console.log(infoPrecios)
barraColores();
mejorTramo();
