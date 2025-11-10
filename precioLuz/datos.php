<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
    function cogerDatos(){
        $conexion = new PDO('mysql:host=localhost;dbname=precioluz;charset=utf8','root','');
        $fecha = $_REQUEST['fechaLuz'];

        if($fecha){
            $consulta = $conexion->query("SELECT * from consumodia WHERE dia = ".$fecha."");
            $respuesta = $consulta->fetchAll(PDO::FETCH_ASSOC);
        }
        return $respuesta;
    }
    ?>
</body>
</html>