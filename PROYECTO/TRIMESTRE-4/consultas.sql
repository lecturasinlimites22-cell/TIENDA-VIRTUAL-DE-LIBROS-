/*============================================================================
  CONSULTAS DQL - PROYECTO LIBRERÍA
============================================================================*/

-- 1. Mostrar todos los clientes
SELECT * FROM cliente;

-- 2. Mostrar todos los libros
SELECT * FROM libro;

-- 3. Mostrar todos los autores
SELECT * FROM autor;

-- 4. Mostrar todas las categorías
SELECT * FROM categoria;

-- 5. Mostrar todas las editoriales
SELECT * FROM editorial;

-- 6. Mostrar todas las ventas
SELECT * FROM venta;

-- 7. Mostrar todos los empleados
SELECT * FROM empleado;

-- 8. Mostrar título y precio de los libros
SELECT titulo, precio FROM libro;

-- 9. Mostrar nombre y teléfono de los clientes
SELECT nombre, telefono FROM cliente;

-- 10. Mostrar nombre y apellido de los empleados
SELECT nombre, apellido FROM empleado;

-- 11. Mostrar libros con precio mayor a $50.000
SELECT * FROM libro WHERE precio > 50000;

-- 12. Mostrar libros con stock mayor a 10
SELECT * FROM libro WHERE stock > 10;

-- 13. Mostrar libros ordenados por precio (menor a mayor)
SELECT * FROM libro ORDER BY precio ASC;

-- 14. Mostrar libros ordenados por precio (mayor a menor)
SELECT * FROM libro ORDER BY precio DESC;

-- 15. Mostrar libros con su categoría
SELECT l.titulo, c.nombre AS categoria 
FROM libro l 
INNER JOIN categoria c ON l.id_categoria = c.id_categoria;

-- 16. Mostrar libros con su editorial
SELECT l.titulo, e.nombre AS editorial 
FROM libro l 
INNER JOIN editorial e ON l.id_editorial = e.id_editorial;

-- 17. Mostrar ventas con el nombre del cliente
SELECT v.id_venta, c.nombre, v.fecha, v.total 
FROM venta v 
INNER JOIN cliente c ON v.id_cliente = c.id_cliente;

-- 18. Mostrar ventas con el empleado que las realizó
SELECT v.id_venta, e.nombre, e.apellido, v.total 
FROM venta v 
INNER JOIN empleado e ON v.id_empleado = e.id_empleado;

-- 19. Mostrar detalle de ventas con el nombre del libro
SELECT dv.id_detalle, l.titulo, dv.cantidad, dv.precio_unitario 
FROM detalle_venta dv 
INNER JOIN libro l ON dv.id_libro = l.id_libro;

-- 20. Contar la cantidad de libros
SELECT COUNT(*) AS total_libros FROM libro;

-- 21. Obtener el precio promedio de los libros
SELECT AVG(precio) AS promedio_precios FROM libro;

-- 22. Obtener el precio máximo
SELECT MAX(precio) AS precio_maximo FROM libro;

-- 23. Obtener el precio mínimo
SELECT MIN(precio) AS precio_minimo FROM libro;

-- 24. Sumar el total de todas las ventas
SELECT SUM(total) AS total_ventas FROM venta;

-- 25. Contar libros por categoría
SELECT c.nombre AS categoria, COUNT(*) AS cantidad 
FROM libro l 
INNER JOIN categoria c ON l.id_categoria = c.id_categoria 
GROUP BY c.nombre;

-- 26. Total vendido por empleado
SELECT e.id_empleado, e.nombre, e.apellido, SUM(v.total) AS total_vendido 
FROM venta v 
INNER JOIN empleado e ON v.id_empleado = e.id_empleado 
GROUP BY e.id_empleado, e.nombre, e.apellido;

-- 27. Libro más costoso
SELECT titulo, precio FROM libro WHERE precio = (SELECT MAX(precio) FROM libro);

-- 28. Libro más económico
SELECT titulo, precio FROM libro WHERE precio = (SELECT MIN(precio) FROM libro);

-- 29. Libros con precio superior al promedio
SELECT titulo, precio FROM libro WHERE precio > (SELECT AVG(precio) FROM libro);

-- 30. Clientes que han realizado compras (CORREGIDO: Sin c.apellido)
SELECT DISTINCT c.nombre 
FROM cliente c
INNER JOIN venta v ON c.id_cliente = v.id_cliente;


/*============================================================================
  CONSULTAS CON JOIN
============================================================================*/

-- 1. Mostrar las ventas con el nombre del cliente y del empleado
SELECT v.id_venta, c.nombre AS cliente, e.nombre AS empleado, v.fecha, v.total 
FROM venta v 
INNER JOIN cliente c ON v.id_cliente = c.id_cliente 
INNER JOIN empleado e ON v.id_empleado = e.id_empleado;

-- 2. Mostrar los libros con su categoría y editorial
SELECT l.titulo, c.nombre AS categoria, ed.nombre AS editorial, l.precio 
FROM libro l 
INNER JOIN categoria c ON l.id_categoria = c.id_categoria 
INNER JOIN editorial ed ON l.id_editorial = ed.id_editorial;

-- 3. Mostrar el detalle de cada venta
SELECT dv.id_detalle, l.titulo, dv.cantidad, dv.precio_unitario 
FROM detalle_venta dv 
INNER JOIN libro l ON dv.id_libro = l.id_libro;

-- 4. Mostrar los autores de cada libro
SELECT l.titulo, a.nombre AS autor 
FROM libro l 
INNER JOIN libro_autor la ON l.id_libro = la.id_libro 
INNER JOIN autor a ON la.id_autor = a.id_autor;

-- 5. Mostrar los pagos realizados y su método de pago
SELECT p.id_pago, mp.nombre AS metodo_pago, p.monto, p.fecha_pago 
FROM pago p 
INNER JOIN metodo_pago mp ON p.id_metodo_pago = mp.id_metodo_pago;


/*============================================================================
  SUBCONSULTAS
============================================================================*/

-- 1. Mostrar los libros con precio superior al promedio
SELECT titulo, precio FROM libro WHERE precio > (SELECT AVG(precio) FROM libro);

-- 2. Mostrar el cliente que realizó la compra más alta (CORREGIDO: Sin c.apellido)
SELECT nombre FROM cliente WHERE id_cliente = (
    SELECT id_cliente FROM venta ORDER BY total DESC LIMIT 1
);

-- 3. Mostrar los libros que nunca se han vendido
SELECT l.titulo FROM libro l 
WHERE NOT EXISTS (
    SELECT 1 FROM detalle_venta dv WHERE dv.id_libro = l.id_libro
);

-- 4. Mostrar los empleados que han realizado ventas
SELECT nombre, apellido FROM empleado WHERE id_empleado IN (
    SELECT id_empleado FROM venta
);

-- 5. Mostrar la categoría con más libros registrados
SELECT nombre FROM categoria WHERE id_categoria = (
    SELECT id_categoria FROM libro GROUP BY id_categoria ORDER BY COUNT(*) DESC LIMIT 1
);

-- 6. Mostrar los clientes que han gastado más de $100.000 (CORREGIDO: Sin c.apellido)
SELECT nombre FROM cliente WHERE id_cliente IN (
    SELECT id_cliente FROM venta GROUP BY id_cliente HAVING SUM(total) > 100000
);

-- 7. Mostrar el libro más caro
SELECT titulo, precio FROM libro WHERE precio = (SELECT MAX(precio) FROM libro);

-- 8. Mostrar el libro con menor stock
SELECT titulo, stock FROM libro WHERE stock = (SELECT MIN(stock) FROM libro);
