# Prueba Desarrollador

Pequeño proyecto que consiste en 2 tareas, un Crud básico y la otra es un algoritmo de ordenamiento y presentación de data en forma de árbol.

  Se uso la ultima versión de Laravel (5.3) para el backend y angular Js (1.5) para el frontend, la aplicación esta estructurada como una SPA usando el componente ui-router para las rutas, bootstrap como framework CSS y se uso un poco del código de SBAdmin template para darle un poco de forma a nivel de diseño.

  Por otro lado se usa gulp como herramienta para el build y SASS como preprocesador CSS.  

## Requerimientos
1. Composer
2. PHP 7.*
3. Node (Opcional: solo si quiere compilar los archivos)

## Instrucciones de instalación  
1. Clone el repositorio.
2. Corra el comando ```composer install``` en el root del proyecto. 
3. Cree el archivo .env basado en el .env.example y modificando las opciones de acuerdo a su entorno de desarrollo.
4. Si no tiene un key definido en el archivo .env corra el comando ```php artisan key:generate```
5. Corra las migraciones ```php artisan migrate``` 
6. Corra los seeders ```php artisan db:seed``` 
7. El proyecto esta listo para su uso.

## Pruebas  

El proyecto viene con pruebas para las api realizadas con phpunit.

  para correrlas configure su entorno de testing a través del archivo .env.testing modificándolo a sus necesidades y ejecute el comando ```phpunit`` `