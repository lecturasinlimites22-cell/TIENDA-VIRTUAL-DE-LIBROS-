DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_libro`(
    IN p_titulo VARCHAR(100),
    IN p_precio DECIMAL(10,2),
    IN p_stock INT,
    IN p_categoria INT,
    IN p_editorial INT
)
BEGIN
    INSERT INTO libro(titulo, precio, stock, id_categoria, id_editorial)
    VALUES(p_titulo, p_precio, p_stock, p_categoria, p_editorial);
END$$

DELIMITER ;
