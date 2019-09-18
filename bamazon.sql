/* this creates the database*/
DROP DATABASE bamazon_db;
CREATE DATABASE bamazon_db;

/* this is how i connect to a database*/
USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT, /* NOT NULL means that this column can not be empty, and it is called a constraint */
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(id) /* if you don't do line 11, you get an error */
);


INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
('Cold Brew', 'Beverages', 4, 100),
('Drip Coffee', 'Beverages', 4, 100),
('New Orleans Iced Coffee', 'Beverages', 4, 60),
('Latte', 'Beverages', 5, 80),
('Mocha', 'Beverages', 5, 80),
('Vegan Almond Latte', 'Beverages', 5, 90),
('Tote Bag', 'Merchandise', 15, 50),
('Hydroflask', 'Merchandise', 20, 50),
('Coffee Sweater', 'Merchandise', 40, 30),
('Mug', 'Merchandise', 15, 20),
('Coffee Scarf', 'Merchandise', 25, 15);

SELECT * FROM products;
DROP INDEX index ON products;
