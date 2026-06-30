CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_stock`(IN p_id_libro INT, IN p_nuevo_stock INT)
BEGIN
UPDATE libro SET stock=p_nuevo_stock WHERE id_libro=p_id_libro;
END