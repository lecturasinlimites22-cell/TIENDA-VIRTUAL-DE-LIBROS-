# Guía Laravel

Este backend ejecuta la API principal con Laravel. Consulta [README.md](README.md) para instalar dependencias, configurar MySQL y arrancar el servidor.

- Servidor local: `php artisan serve --host=127.0.0.1 --port=8000`
- Rutas API: `routes/api.php`
- Controladores: `app/Http/Controllers`
- Autenticación: JWT mediante `POST /api/login`
- Colección Postman: `postman/collections/ejemplo`

La base de datos `libreria` debe estar creada e importada antes de iniciar la API. No ejecutes migraciones sobre la base existente sin preparar primero una migración inicial compatible con su esquema.
