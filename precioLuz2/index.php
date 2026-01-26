<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Precio de la luz</title>
</head>
<body>
    <?php 
    require 'datos.php';
    $fecha = $_GET['fechaLuz'] ?? null;
    $datos = cogerDatos($fecha);
    $dias = cogerDias();
    ?>
    <script>
        let infoPrecios = <?php echo json_encode($datos); ?>;
        let infoNumeroDias = <?php echo json_encode($dias); ?>;
    </script>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center gap-2" href="#">
                    <img src="imagenes/logoCabecera.png" alt="Logo" class="logo" />
                    <span class="fw-semibold">Precio Luz</span>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Abrir menú">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="#">Mercado Luz y Gas</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Compañías</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Trámites</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Distribuidoras</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Ahorro</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Herramientas</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main class="container py-4">
        <section class="mb-4">
            <h1 class="h3 mb-1">Consulta el precio de la luz hoy</h1>
            <p class="text-body-secondary mb-0">Detalles y evolución de la tarifa PVPC.</p>
        </section>

        <section>
            <div class="d-flex flex-column align-items-center text-center mb-3">
                <h2 class="h4 mb-1">Precio de la luz por horas</h2>
                <div class="text-body-secondary">Información del día: <b class="fecha"></b></div>
            </div>

            <form action="index.php" method="get" class="row g-2 align-items-end justify-content-center mb-3">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label for="select" class="form-label">Día</label>
                    <select id="select" name="fechaLuz" class="form-select" onchange="this.form.submit()"></select>
                </div>
            </form>

            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                        <div class="fw-semibold">Barra de precios</div>
                        <div class="text-body-secondary">Gráfica del día: <b class="fecha"></b></div>
                    </div>
                    <div class="table-responsive">
                        <table id="lineaLuz" class="table table-borderless m-0 hour-bar">
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
                    </div>
                </div>
            </div>

            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="fw-semibold mb-2">¿Sabías que?</div>
                    <p class="mb-3">Si no quieres modificar tu rutina, hoy podrías aprovechar este tramo para poner lavadoras o cocinar.</p>
                    <div class="border rounded-3 p-3 text-center" id="tramoEconomico">
                        <div class="fs-4 fw-bold">–</div>
                        <div class="text-body-secondary">–</div>
                    </div>
                    <p class="mt-3 mb-0 text-body-secondary">Este tramo suele ser el más económico del día, aunque puede no coincidir exactamente con la hora más barata.</p>
                </div>
            </div>

            <div class="row row-cols-1 row-cols-md-3 g-3 mb-4">
                <div class="col">
                    <div class="card shadow-sm h-100">
                        <div class="card-body">
                            <div class="fw-semibold">Precio más bajo del día</div>
                            <div class="text-body-secondary mb-2"><span class="fecha"></span></div>
                            <div class="text-center" id="precioBajo"></div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm h-100">
                        <div class="card-body">
                            <div class="fw-semibold">Precio medio del día</div>
                            <div class="text-body-secondary mb-2"><span class="fecha"></span></div>
                            <div class="text-center" id="precioMedio"></div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card shadow-sm h-100">
                        <div class="card-body">
                            <div class="fw-semibold">Precio más alto del día</div>
                            <div class="text-body-secondary mb-2"><span class="fecha"></span></div>
                            <div class="text-center" id="precioAlto"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <div class="fw-semibold mb-2">Lista por horas</div>
                    <div id="lista" class="list-group"></div>
                </div>
            </div>

            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="fw-semibold mb-3">Gráfica (€/kWh)</div>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </section>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="precioLuz.js"></script>
</body>
</html>