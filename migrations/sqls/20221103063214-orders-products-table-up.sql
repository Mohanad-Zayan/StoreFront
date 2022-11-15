CREATE TABLE  orders_products(
    quantity INTEGER ,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);