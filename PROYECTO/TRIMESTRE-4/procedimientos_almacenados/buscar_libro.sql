DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `buscar_libro`(
    IN p_titulo VARCHAR(100)
)
BEGIN
    SELECT * FROM libro 
    WHERE titulo LIKE CONCAT('%', p_titulo, '%');
END$$

DELIMITER ;
