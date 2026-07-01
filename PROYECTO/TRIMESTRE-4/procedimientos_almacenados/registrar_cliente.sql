DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_cliente`(
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(15),
    IN p_direccion VARCHAR(150)
)
BEGIN
    INSERT INTO cliente(nombre, telefono, direccion)
    VALUES(p_nombre, p_telefono, p_direccion);
END$$

DELIMITER ;
