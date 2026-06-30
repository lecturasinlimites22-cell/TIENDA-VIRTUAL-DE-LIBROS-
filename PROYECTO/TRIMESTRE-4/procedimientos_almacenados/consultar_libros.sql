CREATE DEFINER=`root`@`localhost` PROCEDURE `consultar_libros`()
BEGIN
SELECT * FROM libro;
END