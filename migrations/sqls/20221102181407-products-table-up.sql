CREATE TABLE products(
    id SERIAL PRIMARY KEY  ,
    name varchar ,
    category VARCHAR (100) NOT NULL ,
    price MONEY 
);