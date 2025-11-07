DROP DATABASE IF EXISTS electricidad;
CREATE DATABASE electricidad;
USE electricidad;

CREATE TABLE consumoDia(
    consumo int unsigned decimal(5,4) not null,
    dia int unsigned not null,
    hora int unsigned not null,
    primary key(dia,hora)
);
tarifaluzhora.es