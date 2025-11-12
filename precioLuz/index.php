<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Document</title>
</head>
<body>
    <?php 
    require 'datos.php';
    $fecha = 1;
    $datos = cogerDatos($fecha);
    $dias = cogerDias();
    ?>
    <script>
        let infoPrecios = <?php echo json_encode($datos); ?>;
        let infoNumeroDias = <?php echo json_encode($dias); ?>;
    </script>

    <header>
        <nav>
            <div class="imagenNavega"><img src="imagenes/logoCabecera.png"></div>
            <div class="navegacion">
                <ul>
                    <li>Mercado Luz y Gas</li>
                    <li>Compañias</li>
                    <li>Tramites</li>
                    <li>Distribuidoras</li>
                    <li>Ahorro</li>
                    <li>Herramientas</li>
                </ul>
            </div>
        </nav>
    </header>
    <main>
        <section class="inicio">
            <h1>Consulta el precio de la luz hot: Detalles y Evolucion de la tarifa PVPC</h1>
        </section>
        <section class="barraLuz">
            <article id="tituloBarra">
                <h2>Precio de la luz por horas</h2>
                <h2>Informacion del dia: <b class="fecha"></b></h2>
            </article>
            <form action="index.php" method="get">
                <label for="select">Día</label>
                <select id="select" name="fechaLuz" onchange="this.form.submit()"></select>
            </form>

            
            <article class="contenedor">
                <p>Grafica el dia: <b class="fecha">07/11/25</b></p>
                <table id="lineaLuz">
                    <tr>
                        <th id="tabla0"></th>
                        <th id="tabla1"></th>
                        <th id="tabla2"></th>
                        <th id="tabla3"></th>
                        <th id="tabla4"></th>
                        <th id="tabla5"></th>
                        <th id="tabla6"></th>
                        <th id="tabla7"></th>
                        <th id="tabla8"></th>
                        <th id="tabla9"></th>
                        <th id="tabla10"></th>
                        <th id="tabla11"></th>
                        <th id="tabla12"></th>
                        <th id="tabla13"></th>
                        <th id="tabla14"></th>
                        <th id="tabla15"></th>
                        <th id="tabla16"></th>
                        <th id="tabla17"></th>
                        <th id="tabla18"></th>
                        <th id="tabla19"></th>
                        <th id="tabla20"></th>
                        <th id="tabla21"></th>
                        <th id="tabla22"></th>
                        <th id="tabla23"></th>
                    </tr>
                </table>
            </article>
            <article class="contenedor">
                <b>¿Sabias que?</b>
                <p>Si no quieres modificar tu rutina, hoy podrias utilizar este tramo para poner lavadoras o cocinar ya que esta ligeramente mas bajo</p>
                <div class="infoPrecio" id="tramoEconomico">
                    <p>6-9h</p>
                    <p>0.11 €/kWh</p>
                </div>
                <p>Este es el tramo de horas mas economicas durante el dia, que puede o no contener la hora mas economica del dia</p>
            </article>
            <article class="contenedorMedio">
                <article class="contenedor">
                    <p>Precio mas bajo del dia</p>
                    <p class="fecha">07/11/2025</p>
                    <div class="infoPrecio" id="precioBajo">
                        <p>04-05h</p>
                        <p>0.07506 €/kWh</p>
                    </div>
                </article>
                <article class="contenedor">
                    <p>Precio medio del dia</p>
                    <p class="fecha">07/11/2025</p>
                    <div class="infoPrecio" id="precioMedio">
                        <p>0.1328</p>
                        <p>€/kWh</p>
                    </div>
                </article>
                <article class="contenedor"><p>Precio mas alto del dia</p>
                    <p class="fecha">07/11/2025</p>
                    <div class="infoPrecio" id="precioAlto">
                        <p>20-21h</p>
                        <p>0.22805 €/kWh</p>
                    </div>
                </article>
            </article>
            <article class="contenedor" id="lista">
            </article>
            <article>
                    <div>
                        <canvas id="myChart"></canvas>
                    </div>
            </article>
        </section>
    </main>
    <script src="precioLuz.js"></script>
</body>
</html>