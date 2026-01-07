<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
<<<<<<< HEAD
    
=======
    function cogerDatos(){
    $conexion = new PDO('mysql:host=localhost;dbname=precioluz;charset=utf8','root','');
    $respuesta = [];

    $fecha = $_REQUEST['fechaLuz'] ?? null;
    if ($fecha === null || $fecha === '') {
        $row = $conexion->query("SELECT MIN(dia) AS dia FROM consumodia")->fetch(PDO::FETCH_ASSOC);
        $fecha = $row ? $row['dia'] : 1;
    }

    $stmt = $conexion->prepare("SELECT hora, consumo, dia FROM consumodia WHERE dia = ? ORDER BY hora");
    $stmt->execute([$fecha]);
    $respuesta = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $respuesta;
}

    function cogerDias(){
        $conexion = new PDO('mysql:host=localhost;dbname=precioluz;charset=utf8','root','');
        $consulta = $conexion->query("SELECT DISTINCT dia FROM consumodia ORDER BY dia ASC");

        $respuesta = $consulta->fetchAll(PDO::FETCH_ASSOC);
        return $respuesta ?: [];
    }

>>>>>>> 81fcde50d7cfbdc32f6631b7ccf65d831530b1f5
    ?>
</body>
</html>