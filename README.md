# CineMax

Sistema de gestion de cine desarrollado con Spring Boot, orientado a la administracion de peliculas, funciones, salas, clientes, ventas, compras e insumos.

## Tecnologias

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA / Hibernate
- MySQL o MariaDB
- Lombok

## Modulos principales

- Gestion de peliculas, funciones y salas.
- Gestion de clientes, clientes VIP y empleados.
- Gestion de ventas, entradas, pagos y compras.
- Gestion de proveedores e insumos.
- Autenticacion con registro e inicio de sesion.

## Requisitos

- JDK 17
- Maven 3.9+
- Base de datos MySQL/MariaDB activa (por defecto `localhost:3306`)

## Configuracion

La configuracion principal se encuentra en `cinemax/src/main/resources/application.properties`.

Valores por defecto:

- Base de datos: `cineMax`
- Usuario: `root`
- Password: vacio
- Puerto de aplicacion: `8080`

## Ejecucion

Desde la carpeta `cinemax`:

```bash
mvn spring-boot:run
```

Aplicacion web:

- `http://localhost:8080`

## API REST

Base URL:

- `http://localhost:8080/api`

Ejemplos:

- `GET /api/peliculas`
- `GET /api/clientes`
- `POST /api/auth/register`
- `POST /api/auth/login`

## Documentacion JavaDoc

Para generar la documentacion:

```bash
mvn clean javadoc:javadoc
```
