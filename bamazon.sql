/* this creates the database*/
DROP DATABASE bamazon_db;
CREATE DATABASE bamazon_db;

/* this is how i connect to a database*/
USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT, /* NOT NULL means that this column can not be empty, and it is called a constraint */
    item_id INT NOT NULL,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price NUMBER(10,4) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(id) /* if you don't do line 11, you get an error */
);

/* CREATE TABLE pets (
    id INT NOT NULL AUTO_INCREMENT,
    student_id INT NOT NULL,
    pet_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    PRIMARY KEY (id)
); */

/* inserts two rows*/
/* do not insert into the id column*/
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES 
(1000, 'Cold Brew', 'Beverages', 4, 100),
(1001, 'Drip Coffee', 'Beverages', 4, 100),
(1002, 'New Orleans Iced Coffee', 'Beverages', 4, 60),
(1003, 'Latte', 'Beverages', 5, 80),
(1004, 'Mocha', 'Beverages', 5, 80),
(1005, 'Vegan Almond Latte', 'Beverages', 5, 90),
(1022, 'Tote Bag', 'Merchandise', 15, 50),
(1023, 'Hydroflask', 'Merchandise', 20, 50),
(1024, 'Coffee Sweater', 'Merchandise', 40, 30),
(1025, 'Mug', 'Merchandise', 15, 20),
(1026, 'Coffee Scarf', 'Merchandise', 25, 15);


SELECT * FROM products;

