<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <form action="index.php">
        <input type="text" id="temp1" name="num1">
        <input type="text" id="temp2" name="num2">
        <input type="text" id="temp3" name="num3">
        <input type="text" id="temp4" name="num4">
        <input type="text" id="temp5" name="num5">
        <input type="text" id="temp6" name="num6">
        <input type="text" id="temp7" name="num7">
        <input type="text" id="temp8" name="num8">
        <input type="text" id="temp9" name="num9">
        <input type="text" id="temp10" name="num10">
        <input type="text" id="temp11" name="num11">
        <input type="text" id="temp12" name="num12">
        <br>
        <input type="submit" value="Calcular" id="send">
    </form>
    <div>
        <canvas id="myChart"></canvas>
    </div>
    <?php 
        $temperatura = [];
        for($i = 1; $i<13; $i++){
            array_push($temperatura,$_REQUEST['num'.$i] );
        };
        $lluvia = [1,2,3,4,5,6,7,8,9,10,11,12];
        echo "<script>";
        echo "let temperatura = " .json_encode($temperatura) . ";";
        echo "let lluvia = " .json_encode($lluvia) . ";";
        echo "</script>"
        ?>
    <script>
        const myChart = document.getElementById("myChart");
        const data = {
            labels: [
                'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octuble','Noviembre','Diciembre'
            ],
            datasets: [{
                type:'bar',
                label: 'LLuvia',
                data: lluvia,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                ],
                borderWidth: 1
            },
            {
                type:'line',
                label: 'Temperatura',
                data: temperatura,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgb(75, 192, 192)',
                ],
                borderWidth: 1
            }]
        };
        new Chart(myChart,{
            data: data,
            options:{
                scales:{
                    y:{
                        begintAtZero: true
                    }
                }
            }
        });
        //una solo de lluvia, luego otra con lluvia y temperatura y luego otra con lluvia con barChart y temperatura con lineChart
        

    </script>
</body>
</html>