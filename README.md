# CineMax - Entrega Final

Proyecto Spring Boot + JPA + MySQL/MariaDB para gestion de cine.

## Requisitos

- Java 17
- Maven
- MySQL/MariaDB (recomendado XAMPP en `localhost:3306`)

## Ejecutar proyecto

Desde la carpeta `cinemax`:

```bash
mvn spring-boot:run
```

Aplicacion web:

- `http://localhost:8080`

## Generar JavaDoc

Desde la carpeta `cinemax`:

```bash
mvn clean javadoc:javadoc
```

El resultado se genera en:

- `cinemax/target/site/apidocs/index.html`

Opcional (empaquetado + JavaDoc):

```bash
mvn clean package javadoc:javadoc
```

## Subir a GitHub (pasos rapidos)

Si todavia no inicializaste repo:

```bash
git init
git add .
git commit -m "feat: proyecto CineMax con auth y JavaDoc"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Si ya existe repo:

```bash
git add .
git commit -m "docs: agregar configuracion y guia de JavaDoc"
git push
```

## Nota para la entrega

- Verificar que la app inicie sin errores.
- Adjuntar en GitHub el codigo fuente.
- Si el profesor pide evidencia de JavaDoc, incluir captura de `target/site/apidocs/index.html` abierto en navegador.
