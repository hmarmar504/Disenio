<?php
/**
 * Devuelve los precios (hora, consumo, dia) del día indicado.
 * Si no se pasa día, se devuelve el día mínimo disponible en la tabla.
 */
function cogerDatos(?string $dia = null): array {
    $conexion = new PDO(
        'mysql:host=localhost;dbname=precioLuz;charset=utf8',
        'root',
        '',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    if ($dia === null || $dia === '') {
        $row = $conexion->query('SELECT MIN(dia) AS dia FROM consumoDia')->fetch();
        $dia = $row && isset($row['dia']) ? (string)$row['dia'] : '1';
    }

    $stmt = $conexion->prepare('SELECT hora, consumo, dia FROM consumoDia WHERE dia = ? ORDER BY hora');
    $stmt->execute([$dia]);

    return $stmt->fetchAll() ?: [];
}

/**
 * Devuelve los días disponibles (DISTINCT dia).
 */
function cogerDias(): array {
    $conexion = new PDO(
        'mysql:host=localhost;dbname=precioLuz;charset=utf8',
        'root',
        '',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    $consulta = $conexion->query('SELECT DISTINCT dia FROM consumoDia ORDER BY dia ASC');
    return $consulta->fetchAll() ?: [];
}
