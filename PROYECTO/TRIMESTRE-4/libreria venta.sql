-- ======================
-- CREAR BASE DE DATOS
-- ======================

DROP DATABASE IF EXISTS libreria;
CREATE DATABASE libreria;
USE libreria;

-- ======================
-- TABLAS
-- ======================

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    direccion VARCHAR(150)
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    correo VARCHAR(100)
);

CREATE TABLE rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100)
);

CREATE TABLE rol_usuario (
    id_rol INT,
    id_usuario INT,
    PRIMARY KEY (id_rol, id_usuario),
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE empleado (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    telefono VARCHAR(15),
    cargo VARCHAR(50),
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200)
);

CREATE TABLE editorial (
    id_editorial INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(50)
);

CREATE TABLE autor (
    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE libro (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT,
    id_editorial INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_editorial) REFERENCES editorial(id_editorial)
);

CREATE TABLE libro_autor (
    id_libro INT,
    id_autor INT,
    PRIMARY KEY (id_libro, id_autor),
    FOREIGN KEY (id_libro) REFERENCES libro(id_libro),
    FOREIGN KEY (id_autor) REFERENCES autor(id_autor)
);

CREATE TABLE venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_empleado INT,
    fecha DATETIME,
    total DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado)
);

CREATE TABLE detalle_venta (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_libro INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_libro) REFERENCES libro(id_libro)
);

CREATE TABLE metodo_pago (
    id_metodo_pago INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_metodo_pago INT,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATETIME,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago)
);





-- ======================
-- CLIENTES
-- ======================

INSERT INTO cliente (nombre, telefono, direccion) VALUES
('Juan Perez','3001234567','Bogotá'),
('Maria Lopez','3109876543','Medellín'),
('Carlos Ruiz','3023333333','Cali'),
('Laura Gomez','3034444444','Cartagena'),
('Andres Torres','3045555555','Barranquilla'),
('Sofia Ramirez','3056666666','Pereira'),
('Daniel Castro','3067777777','Manizales'),
('Paula Diaz','3078888888','Tunja'),
('Camila Rojas','3089999999','Ibagué'),
('David Herrera','3091010101','Cúcuta'),
('Natalia Silva','3101111111','Santa Marta'),
('Felipe Mora','3112222222','Villavicencio'),
('Sara Jimenez','3123333333','Armenia'),
('Kevin Martinez','3134444444','Neiva'),
('Valentina Cruz','3145555555','Pasto'),
('Mateo Vargas','3156666666','Popayán');

-- ======================
-- USUARIOS
-- ======================

INSERT INTO usuario (username, password, correo) VALUES
('admin', SHA2('123456',256), 'admin@gmail.com'),
('user2', SHA2('123456',256), 'user2@gmail.com'),
('user3', SHA2('123456',256), 'user3@gmail.com'),
('user4', SHA2('123456',256), 'user4@gmail.com'),
('user5', SHA2('123456',256), 'user5@gmail.com'),
('user6', SHA2('123456',256), 'user6@gmail.com'),
('user7', SHA2('123456',256), 'user7@gmail.com'),
('user8', SHA2('123456',256), 'user8@gmail.com'),
('user9', SHA2('123456',256), 'user9@gmail.com'),
('user10', SHA2('123456',256), 'user10@gmail.com'),
('user11', SHA2('123456',256), 'user11@gmail.com'),
('user12', SHA2('123456',256), 'user12@gmail.com'),
('user13', SHA2('123456',256), 'user13@gmail.com'),
('user14', SHA2('123456',256), 'user14@gmail.com'),
('user15', SHA2('123456',256), 'user15@gmail.com'),
('user16', SHA2('123456',256), 'user16@gmail.com');
-- ======================
-- ROLES
-- ======================

INSERT INTO rol (nombre, descripcion) VALUES
('Administrador','Control total'),
('Usuario','Comprador');

-- ======================
-- ROL_USUARIO
-- ======================

INSERT INTO rol_usuario VALUES
(1,1),
(2,2);

-- ======================
-- EMPLEADOS
-- ======================

INSERT INTO empleado
(nombre, apellido, telefono, cargo, id_usuario)
VALUES
('Carlos','Gomez','3201111111','Administrador',1),
('Luis','Torres','3202222222','Vendedor',2),
('Camila','Rojas','3203333333','Vendedor',3),
('Andres','Perez','3204444444','Cajero',4),
('Sofia','Lopez','3205555555','Supervisor',5),
('Daniel','Martinez','3206666666','Administrador',6),
('Laura','Ramirez','3207777777','Vendedor',7),
('Paula','Diaz','3208888888','Cajero',8),
('David','Silva','3209999999','Supervisor',9),
('Natalia','Castro','3210000000','Administrador',10),
('Kevin','Mora','3211111111','Vendedor',11),
('Valentina','Jimenez','3212222222','Cajero',12),
('Felipe','Ruiz','3213333333','Supervisor',13),
('Sara','Herrera','3214444444','Administrador',14),
('Mateo','Cruz','3215555555','Vendedor',15),
('Julian','Vargas','3216666666','Cajero',16);


-- ======================
-- CATEGORIAS
-- ======================

INSERT INTO categoria (nombre, descripcion) VALUES
('Novela','Libros narrativos'),
('Tecnología','Libros técnicos'),
('Historia','Libros históricos'),
('Matemáticas','Libros académicos'),
('Programación','Software'),
('Ciencia','Investigación'),
('Ficción','Libros ficticios'),
('Arte','Diseño y dibujo'),
('Economía','Finanzas'),
('Administración','Empresas'),
('Psicología','Comportamiento'),
('Derecho','Leyes'),
('Educación','Aprendizaje'),
('Marketing','Publicidad'),
('Idiomas','Lenguas extranjeras'),
('Literatura','Obras clásicas');

-- ======================
-- EDITORIALES
-- ======================

INSERT INTO editorial (nombre, pais) VALUES
('Planeta','España'),
('Pearson','USA'),
('Norma','Colombia'),
('Santillana','Colombia'),
('Alfaomega','México'),
('McGraw Hill','USA'),
('Panamericana','Colombia'),
('Anaya','España'),
('Oxford','Reino Unido'),
('Cambridge','Reino Unido'),
('ECOE','Colombia'),
('Minotauro','Argentina'),
('Debolsillo','España'),
('Kapelusz','Argentina'),
('Larousse','Francia'),
('Penguin Random House','Estados Unidos');

-- ======================
-- AUTORES
-- ======================

INSERT INTO autor (nombre) VALUES
('Gabriel Garcia Marquez'),
('Robert Kiyosaki'),
('Paulo Coelho'),
('Stephen King'),
('Mario Mendoza'),
('J.K. Rowling'),
('Isabel Allende'),
('Dan Brown'),
('Julio Verne'),
('J.R.R. Tolkien'),
('George Orwell'),
('Miguel de Cervantes'),
('Victor Hugo'),
('Arthur Conan Doyle'),
('Suzanne Collins'),
('Yuval Noah Harari');

-- ======================
-- LIBROS
-- ======================

INSERT INTO libro
(titulo, precio, stock, id_categoria, id_editorial)
VALUES
('Cien años de soledad',50000,10,1,1),
('Padre Rico Padre Pobre',40000,15,9,2),
('El Alquimista',45000,12,1,3),
('It',70000,8,7,4),
('Satanás',55000,10,1,5),
('Harry Potter y la Piedra Filosofal',80000,7,7,6),
('La Casa de los Espíritus',60000,9,1,7),
('Código Da Vinci',65000,11,7,8),
('Viaje al Centro de la Tierra',35000,13,16,9),
('El Señor de los Anillos',90000,5,7,10),
('1984',42000,14,7,11),
('Don Quijote de la Mancha',50000,6,16,12),
('Los Miserables',47000,8,16,13),
('Sherlock Holmes',52000,9,16,14),
('Los Juegos del Hambre',58000,10,7,15),
('Sapiens',75000,7,3,16);

-- ======================
-- LIBRO_AUTOR
-- ======================

INSERT INTO libro_autor VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,7),
(8,8),
(9,9),
(10,10),
(11,11),
(12,12),
(13,13),
(14,14),
(15,15),
(16,16);


-- ======================
-- VENTAS
-- ======================

INSERT INTO venta
(id_cliente, id_empleado, fecha, total)
VALUES
(1,1,NOW(),50000),
(2,2,NOW(),60000),
(3,3,NOW(),70000),
(4,4,NOW(),45000),
(5,5,NOW(),80000),
(6,6,NOW(),55000),
(7,7,NOW(),30000),
(8,8,NOW(),90000),
(9,9,NOW(),75000),
(10,10,NOW(),65000),
(11,11,NOW(),48000),
(12,12,NOW(),72000),
(13,13,NOW(),58000),
(14,14,NOW(),62000),
(15,15,NOW(),53000),
(16,16,NOW(),90000);

-- ======================
-- DETALLE_VENTA
-- ======================

INSERT INTO detalle_venta
(id_venta, id_libro, cantidad, precio_unitario)
VALUES
(1,1,1,50000),
(2,2,1,40000),
(3,3,2,35000),
(4,4,1,45000),
(5,5,1,80000),
(6,6,1,55000),
(7,7,1,30000),
(8,8,1,90000),
(9,9,2,37500),
(10,10,1,65000),
(11,11,1,48000),
(12,12,1,72000),
(13,13,1,58000),
(14,14,1,62000),
(15,15,1,53000),
(16,16,1,90000);

-- ======================
-- METODOS DE PAGO
-- ======================

INSERT INTO metodo_pago (nombre) VALUES
('Efectivo'),
('Tarjeta'),
('Nequi'),
('Daviplata'),
('Transferencia'),
('PayPal'),
('PSE'),
('Crédito'),
('Débito'),
('Bitcoin'),
('Cheque'),
('Consignación'),
('QR'),
('Apple Pay'),
('Google Pay'),
('Mercado Pago');

-- ======================
-- PAGOS
-- ======================

INSERT INTO pago
(id_venta, id_metodo_pago, monto, fecha_pago)
VALUES
(1,1,50000,NOW()),
(2,2,60000,NOW()),
(3,3,70000,NOW()),
(4,4,45000,NOW()),
(5,5,80000,NOW()),
(6,6,55000,NOW()),
(7,7,30000,NOW()),
(8,8,90000,NOW()),
(9,9,75000,NOW()),
(10,10,65000,NOW()),
(11,11,48000,NOW()),
(12,12,72000,NOW()),
(13,13,58000,NOW()),
(14,14,62000,NOW()),
(15,15,53000,NOW()),
(16,16,90000,NOW());