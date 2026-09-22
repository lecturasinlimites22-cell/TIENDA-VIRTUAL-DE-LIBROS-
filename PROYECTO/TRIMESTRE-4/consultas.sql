/*============================================================================
  CONSULTAS JOIN  - PROYECTO LIBRERÍA
============================================================================*/

-- 1. Ventas con cliente y empleado
SELECT v.id_venta,c.nombre AS cliente,
CONCAT(e.nombre,' ',e.apellido) AS empleado,
v.fecha,v.total
FROM venta v
INNER JOIN cliente c ON v.id_cliente=c.id_cliente
INNER JOIN empleado e ON v.id_empleado=e.id_empleado;

-- 2. Libros con categoría y editorial
SELECT l.id_libro,l.titulo,
c.nombre AS categoria,
ed.nombre AS editorial,
l.precio,l.stock
FROM libro l
INNER JOIN categoria c ON l.id_categoria=c.id_categoria
INNER JOIN editorial ed ON l.id_editorial=ed.id_editorial;

-- 3. Libros con autor
SELECT l.titulo,
a.nombre AS autor
FROM libro l
INNER JOIN libro_autor la ON l.id_libro=la.id_libro
INNER JOIN autor a ON la.id_autor=a.id_autor;

-- 4. Detalle completo de ventas
SELECT v.id_venta,
c.nombre,
l.titulo,
dv.cantidad,
dv.precio_unitario,
dv.cantidad*dv.precio_unitario AS subtotal
FROM venta v
INNER JOIN cliente c ON v.id_cliente=c.id_cliente
INNER JOIN detalle_venta dv ON v.id_venta=dv.id_venta
INNER JOIN libro l ON dv.id_libro=l.id_libro;

-- 5. Pago con método de pago
SELECT p.id_pago,
mp.nombre AS metodo_pago,
p.monto,
p.fecha_pago
FROM pago p
INNER JOIN metodo_pago mp
ON p.id_metodo_pago=mp.id_metodo_pago;

-- 6. Cliente, libro y empleado
SELECT c.nombre AS cliente,
l.titulo,
CONCAT(e.nombre,' ',e.apellido) AS empleado
FROM venta v
INNER JOIN cliente c ON v.id_cliente=c.id_cliente
INNER JOIN empleado e ON v.id_empleado=e.id_empleado
INNER JOIN detalle_venta dv ON v.id_venta=dv.id_venta
INNER JOIN libro l ON dv.id_libro=l.id_libro;

-- 7. Libros con todos sus datos
SELECT
l.titulo,
a.nombre AS autor,
c.nombre AS categoria,
ed.nombre AS editorial,
l.precio
FROM libro l
INNER JOIN libro_autor la ON l.id_libro=la.id_libro
INNER JOIN autor a ON la.id_autor=a.id_autor
INNER JOIN categoria c ON l.id_categoria=c.id_categoria
INNER JOIN editorial ed ON l.id_editorial=ed.id_editorial;

-- 8. Total vendido por empleado
SELECT
CONCAT(e.nombre,' ',e.apellido) empleado,
SUM(v.total) total
FROM empleado e
INNER JOIN venta v
ON e.id_empleado=v.id_empleado
GROUP BY e.id_empleado;

-- 9. Cantidad de ventas por cliente
SELECT
c.nombre,
COUNT(v.id_venta) ventas
FROM cliente c
INNER JOIN venta v
ON c.id_cliente=v.id_cliente
GROUP BY c.id_cliente;

-- 10. Cantidad de libros por categoría
SELECT
c.nombre,
COUNT(l.id_libro) libros
FROM categoria c
INNER JOIN libro l
ON c.id_categoria=l.id_categoria
GROUP BY c.id_categoria;

-- 11. Promedio de precios por categoría
SELECT
c.nombre,
AVG(l.precio) promedio
FROM categoria c
INNER JOIN libro l
ON c.id_categoria=l.id_categoria
GROUP BY c.id_categoria;

-- 12. Editorial con más libros
SELECT
ed.nombre,
COUNT(l.id_libro) cantidad
FROM editorial ed
INNER JOIN libro l
ON ed.id_editorial=l.id_editorial
GROUP BY ed.id_editorial;

-- 13. Autores con cantidad de libros
SELECT
a.nombre,
COUNT(la.id_libro) libros
FROM autor a
INNER JOIN libro_autor la
ON a.id_autor=la.id_autor
GROUP BY a.id_autor;

-- 14. Ventas superiores a $100000
SELECT
c.nombre,
v.total
FROM venta v
INNER JOIN cliente c
ON c.id_cliente=v.id_cliente
WHERE v.total>100000;

-- 15. Libros con stock menor a 5
SELECT
l.titulo,
c.nombre categoria,
l.stock
FROM libro l
INNER JOIN categoria c
ON c.id_categoria=l.id_categoria
WHERE l.stock<5;

-- 16. Empleados y cantidad de ventas
SELECT
CONCAT(e.nombre,' ',e.apellido),
COUNT(v.id_venta)
FROM empleado e
INNER JOIN venta v
ON e.id_empleado=v.id_empleado
GROUP BY e.id_empleado;

-- 17. Cliente con método de pago
SELECT
c.nombre,
mp.nombre metodo_pago,
p.monto
FROM cliente c
INNER JOIN venta v
ON c.id_cliente=v.id_cliente
INNER JOIN pago p
ON p.id_venta=v.id_venta
INNER JOIN metodo_pago mp
ON p.id_metodo_pago=mp.id_metodo_pago;

-- 18. Libros vendidos por categoría
SELECT
c.nombre categoria,
l.titulo,
dv.cantidad
FROM categoria c
INNER JOIN libro l
ON c.id_categoria=l.id_categoria
INNER JOIN detalle_venta dv
ON l.id_libro=dv.id_libro;

-- 19. Total vendido por categoría
SELECT
c.nombre,
SUM(dv.cantidad*dv.precio_unitario) total
FROM categoria c
INNER JOIN libro l
ON c.id_categoria=l.id_categoria
INNER JOIN detalle_venta dv
ON l.id_libro=dv.id_libro
GROUP BY c.id_categoria;

-- 20. Reporte general
SELECT
v.id_venta,
c.nombre cliente,
CONCAT(e.nombre,' ',e.apellido) empleado,
l.titulo,
dv.cantidad,
mp.nombre metodo_pago,
v.total
FROM venta v
INNER JOIN cliente c ON c.id_cliente=v.id_cliente
INNER JOIN empleado e ON e.id_empleado=v.id_empleado
INNER JOIN detalle_venta dv ON dv.id_venta=v.id_venta
INNER JOIN libro l ON l.id_libro=dv.id_libro
INNER JOIN pago p ON p.id_venta=v.id_venta
INNER JOIN metodo_pago mp ON mp.id_metodo_pago=p.id_metodo_pago;

/*============================================================================
CONSULTAS JOIN - PROYECTO LIBRERÍA
============================================================================*/

-- 1. Mostrar las ventas con el nombre del cliente y del empleado
SELECT
    v.id_venta,
    c.nombre AS cliente,
    CONCAT(e.nombre,' ',e.apellido) AS empleado,
    v.fecha,
    v.total
FROM venta v
INNER JOIN cliente c
    ON v.id_cliente = c.id_cliente
INNER JOIN empleado e
    ON v.id_empleado = e.id_empleado;

-- 2. Mostrar los libros con su categoría y editorial
SELECT
    l.id_libro,
    l.titulo,
    c.nombre AS categoria,
    ed.nombre AS editorial,
    l.precio,
    l.stock
FROM libro l
INNER JOIN categoria c
    ON l.id_categoria = c.id_categoria
INNER JOIN editorial ed
    ON l.id_editorial = ed.id_editorial;

-- 3. Mostrar el detalle completo de cada venta
SELECT
    v.id_venta,
    c.nombre AS cliente,
    l.titulo,
    dv.cantidad,
    dv.precio_unitario,
    (dv.cantidad * dv.precio_unitario) AS subtotal
FROM venta v
INNER JOIN cliente c
    ON v.id_cliente = c.id_cliente
INNER JOIN detalle_venta dv
    ON v.id_venta = dv.id_venta
INNER JOIN libro l
    ON dv.id_libro = l.id_libro;

-- 4. Mostrar los autores de cada libro
SELECT
    l.titulo,
    a.nombre AS autor
FROM libro l
INNER JOIN libro_autor la
    ON l.id_libro = la.id_libro
INNER JOIN autor a
    ON la.id_autor = a.id_autor;

-- 5. Mostrar los pagos con el método de pago
SELECT
    p.id_pago,
    mp.nombre AS metodo_pago,
    p.monto,
    p.fecha_pago
FROM pago p
INNER JOIN metodo_pago mp
    ON p.id_metodo_pago = mp.id_metodo_pago;

-- 6. Mostrar cliente, empleado y libro vendido
SELECT
    c.nombre AS cliente,
    CONCAT(e.nombre,' ',e.apellido) AS empleado,
    l.titulo
FROM venta v
INNER JOIN cliente c
    ON v.id_cliente = c.id_cliente
INNER JOIN empleado e
    ON v.id_empleado = e.id_empleado
INNER JOIN detalle_venta dv
    ON v.id_venta = dv.id_venta
INNER JOIN libro l
    ON dv.id_libro = l.id_libro;

-- 7. Mostrar libro, autor, categoría y editorial
SELECT
    l.titulo,
    a.nombre AS autor,
    c.nombre AS categoria,
    ed.nombre AS editorial,
    l.precio
FROM libro l
INNER JOIN libro_autor la
    ON l.id_libro = la.id_libro
INNER JOIN autor a
    ON la.id_autor = a.id_autor
INNER JOIN categoria c
    ON l.id_categoria = c.id_categoria
INNER JOIN editorial ed
    ON l.id_editorial = ed.id_editorial;

-- 8. Total vendido por empleado
SELECT
    e.id_empleado,
    CONCAT(e.nombre,' ',e.apellido) AS empleado,
    COUNT(v.id_venta) AS ventas_realizadas,
    SUM(v.total) AS total_vendido
FROM empleado e
INNER JOIN venta v
    ON e.id_empleado = v.id_empleado
GROUP BY e.id_empleado,e.nombre,e.apellido;

-- 9. Cantidad de compras por cliente
SELECT
    c.id_cliente,
    c.nombre,
    COUNT(v.id_venta) AS total_compras
FROM cliente c
INNER JOIN venta v
    ON c.id_cliente = v.id_cliente
GROUP BY c.id_cliente,c.nombre;

-- 10. Cantidad de libros por categoría
SELECT
    c.nombre AS categoria,
    COUNT(l.id_libro) AS cantidad_libros
FROM categoria c
INNER JOIN libro l
    ON c.id_categoria = l.id_categoria
GROUP BY c.id_categoria,c.nombre;

-- 11. Precio promedio por categoría
SELECT
    c.nombre AS categoria,
    AVG(l.precio) AS promedio_precio
FROM categoria c
INNER JOIN libro l
    ON c.id_categoria = l.id_categoria
GROUP BY c.id_categoria,c.nombre;

-- 12. Editorial con más libros registrados
SELECT
    ed.nombre AS editorial,
    COUNT(l.id_libro) AS cantidad
FROM editorial ed
INNER JOIN libro l
    ON ed.id_editorial = l.id_editorial
GROUP BY ed.id_editorial,ed.nombre;

-- 13. Cantidad de libros por autor
SELECT
    a.nombre AS autor,
    COUNT(la.id_libro) AS cantidad_libros
FROM autor a
INNER JOIN libro_autor la
    ON a.id_autor = la.id_autor
GROUP BY a.id_autor,a.nombre;

-- 14. Ventas superiores a $100.000
SELECT
    c.nombre,
    v.total,
    v.fecha
FROM venta v
INNER JOIN cliente c
    ON c.id_cliente = v.id_cliente
WHERE v.total > 100000;

-- 15. Libros con poco stock
SELECT
    l.titulo,
    c.nombre AS categoria,
    l.stock
FROM libro l
INNER JOIN categoria c
    ON c.id_categoria = l.id_categoria
WHERE l.stock < 5;

-- 16. Empleados con número de ventas
SELECT
    CONCAT(e.nombre,' ',e.apellido) AS empleado,
    COUNT(v.id_venta) AS cantidad_ventas
FROM empleado e
INNER JOIN venta v
    ON e.id_empleado = v.id_empleado
GROUP BY e.id_empleado,e.nombre,e.apellido;

-- 17. Cliente con método de pago utilizado
SELECT
    c.nombre,
    mp.nombre AS metodo_pago,
    p.monto
FROM cliente c
INNER JOIN venta v
    ON c.id_cliente = v.id_cliente
INNER JOIN pago p
    ON p.id_venta = v.id_venta
INNER JOIN metodo_pago mp
    ON mp.id_metodo_pago = p.id_metodo_pago;

-- 18. Libros vendidos por categoría
SELECT
    c.nombre AS categoria,
    l.titulo,
    dv.cantidad
FROM categoria c
INNER JOIN libro l
    ON c.id_categoria = l.id_categoria
INNER JOIN detalle_venta dv
    ON l.id_libro = dv.id_libro;

-- 19. Total vendido por categoría
SELECT
    c.nombre AS categoria,
    SUM(dv.cantidad * dv.precio_unitario) AS total_vendido
FROM categoria c
INNER JOIN libro l
    ON c.id_categoria = l.id_categoria
INNER JOIN detalle_venta dv
    ON l.id_libro = dv.id_libro
GROUP BY c.id_categoria,c.nombre;

-- 20. Reporte general del sistema
SELECT
    v.id_venta,
    c.nombre AS cliente,
    CONCAT(e.nombre,' ',e.apellido) AS empleado,
    l.titulo,
    dv.cantidad,
    mp.nombre AS metodo_pago,
    v.total
FROM venta v
INNER JOIN cliente c
    ON c.id_cliente = v.id_cliente
INNER JOIN empleado e
    ON e.id_empleado = v.id_empleado
INNER JOIN detalle_venta dv
    ON dv.id_venta = v.id_venta
INNER JOIN libro l
    ON l.id_libro = dv.id_libro
INNER JOIN pago p
    ON p.id_venta = v.id_venta
INNER JOIN metodo_pago mp
    ON mp.id_metodo_pago = p.id_metodo_pago;
    
    /*============================================================================
  CONSULTAS COMPLEJAS - PROYECTO LIBRERÍA
============================================================================*/

-- 1. Cliente que más dinero ha gastado
SELECT
    c.id_cliente,
    c.nombre,
    SUM(v.total) AS total_gastado
FROM cliente c
INNER JOIN venta v
ON c.id_cliente = v.id_cliente
GROUP BY c.id_cliente, c.nombre
ORDER BY total_gastado DESC
LIMIT 1;

-- 2. Empleado con mayor cantidad de ventas
SELECT
    e.id_empleado,
    CONCAT(e.nombre,' ',e.apellido) AS empleado,
    COUNT(v.id_venta) AS ventas_realizadas
FROM empleado e
INNER JOIN venta v
ON e.id_empleado = v.id_empleado
GROUP BY e.id_empleado,e.nombre,e.apellido
ORDER BY ventas_realizadas DESC;

-- 3. Empleado con mayor monto vendido
SELECT
    e.id_empleado,
    CONCAT(e.nombre,' ',e.apellido) AS empleado,
    SUM(v.total) AS total_vendido
FROM empleado e
INNER JOIN venta v
ON e.id_empleado=v.id_empleado
GROUP BY e.id_empleado,e.nombre,e.apellido
ORDER BY total_vendido DESC;

-- 4. Libro más vendido
SELECT
    l.titulo,
    SUM(dv.cantidad) AS cantidad_vendida
FROM libro l
INNER JOIN detalle_venta dv
ON l.id_libro=dv.id_libro
GROUP BY l.id_libro,l.titulo
ORDER BY cantidad_vendida DESC;

-- 5. Categoría con mayor cantidad de ventas
SELECT
    c.nombre,
    SUM(dv.cantidad) AS total_vendido
FROM categoria c
INNER JOIN libro l
ON c.id_categoria=l.id_categoria
INNER JOIN detalle_venta dv
ON l.id_libro=dv.id_libro
GROUP BY c.id_categoria,c.nombre
ORDER BY total_vendido DESC;

-- 6. Editorial con más libros registrados
SELECT
    e.nombre,
    COUNT(l.id_libro) AS cantidad_libros
FROM editorial e
INNER JOIN libro l
ON e.id_editorial=l.id_editorial
GROUP BY e.id_editorial,e.nombre
ORDER BY cantidad_libros DESC;

-- 7. Autor con más libros registrados
SELECT
    a.nombre,
    COUNT(la.id_libro) AS libros
FROM autor a
INNER JOIN libro_autor la
ON a.id_autor=la.id_autor
GROUP BY a.id_autor,a.nombre
ORDER BY libros DESC;

-- 8. Clientes que compraron más de 3 libros
SELECT
    c.nombre,
    SUM(dv.cantidad) AS libros_comprados
FROM cliente c
INNER JOIN venta v
ON c.id_cliente=v.id_cliente
INNER JOIN detalle_venta dv
ON v.id_venta=dv.id_venta
GROUP BY c.id_cliente,c.nombre
HAVING SUM(dv.cantidad)>3;

-- 9. Precio promedio por categoría
SELECT
    c.nombre,
    AVG(l.precio) AS promedio
FROM categoria c
INNER JOIN libro l
ON c.id_categoria=l.id_categoria
GROUP BY c.id_categoria,c.nombre;

-- 10. Libros con precio superior al promedio de su categoría
SELECT
    l.titulo,
    l.precio
FROM libro l
WHERE l.precio>
(
    SELECT AVG(precio)
    FROM libro
    WHERE id_categoria=l.id_categoria
);

-- 11. Libros nunca vendidos
SELECT
    l.titulo
FROM libro l
WHERE NOT EXISTS
(
    SELECT *
    FROM detalle_venta dv
    WHERE dv.id_libro=l.id_libro
);

-- 12. Clientes que nunca han comprado
SELECT
    c.nombre
FROM cliente c
WHERE NOT EXISTS
(
    SELECT *
    FROM venta v
    WHERE v.id_cliente=c.id_cliente
);

-- 13. Empleados que no han realizado ventas
SELECT
    e.nombre,
    e.apellido
FROM empleado e
WHERE NOT EXISTS
(
    SELECT *
    FROM venta v
    WHERE v.id_empleado=e.id_empleado
);

-- 14. Total vendido por método de pago
SELECT
    mp.nombre,
    SUM(p.monto) AS total
FROM metodo_pago mp
INNER JOIN pago p
ON mp.id_metodo_pago=p.id_metodo_pago
GROUP BY mp.id_metodo_pago,mp.nombre;

-- 15. Ventas superiores al promedio
SELECT
    id_venta,
    total
FROM venta
WHERE total>
(
    SELECT AVG(total)
    FROM venta
);

-- 16. Libros con stock menor al promedio
SELECT
    titulo,
    stock
FROM libro
WHERE stock<
(
    SELECT AVG(stock)
    FROM libro
);

-- 17. Clientes cuyo gasto supera el promedio
SELECT
    c.nombre,
    SUM(v.total) AS total
FROM cliente c
INNER JOIN venta v
ON c.id_cliente=v.id_cliente
GROUP BY c.id_cliente,c.nombre
HAVING SUM(v.total)>
(
    SELECT AVG(total)
    FROM venta
);

-- 18. Cantidad de ventas por mes
SELECT
    MONTH(fecha) AS mes,
    COUNT(*) AS ventas
FROM venta
GROUP BY MONTH(fecha);

-- 19. Valor total vendido por categoría
SELECT
    c.nombre,
    SUM(dv.cantidad*dv.precio_unitario) AS total
FROM categoria c
INNER JOIN libro l
ON c.id_categoria=l.id_categoria
INNER JOIN detalle_venta dv
ON l.id_libro=dv.id_libro
GROUP BY c.id_categoria,c.nombre
ORDER BY total DESC;

-- 20. Reporte general del sistema
SELECT
    v.id_venta,
    c.nombre AS cliente,
    CONCAT(e.nombre,' ',e.apellido) AS empleado,
    l.titulo,
    a.nombre AS autor,
    cat.nombre AS categoria,
    ed.nombre AS editorial,
    dv.cantidad,
    dv.precio_unitario,
    mp.nombre AS metodo_pago,
    v.total
FROM venta v
INNER JOIN cliente c
ON c.id_cliente=v.id_cliente
INNER JOIN empleado e
ON e.id_empleado=v.id_empleado
INNER JOIN detalle_venta dv
ON dv.id_venta=v.id_venta
INNER JOIN libro l
ON l.id_libro=dv.id_libro
INNER JOIN libro_autor la
ON la.id_libro=l.id_libro
INNER JOIN autor a
ON a.id_autor=la.id_autor
INNER JOIN categoria cat
ON cat.id_categoria=l.id_categoria
INNER JOIN editorial ed
ON ed.id_editorial=l.id_editorial
INNER JOIN pago p
ON p.id_venta=v.id_venta
INNER JOIN metodo_pago mp
ON mp.id_metodo_pago=p.id_metodo_pago;