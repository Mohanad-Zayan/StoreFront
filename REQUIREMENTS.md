# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products 

- Index => [GET] [127.0.0.1:3000/products] 
- Create [token required] => [POST] [127.0.0.1:3000/products]
- Show => [GET] [127.0.0.1:3000/products/:productId] 

- [OPTIONAL] Products by category (args: product category) => [GET] [127.0.0.1:3000/products/category/:category]
- [OPTIONAL] Top 5 most popular products

#### Users

- Index  [token required] => [GET] [127.0.0.1:3000/]
- Show  [token required] => [GET] [127.0.0.1:3000/:id]
- Create [token required] => [POST] [127.0.0.1:3000/]

#### Orders

- Current Order by user (args: user id)[token required] => [GET] [127.0.0.1:3000/orders/user/:userid]

- [OPTIONAL] Completed Orders by user (args: user id)[token required] => [Post] [127.0.0.1:3000/orders/user/:userid/status/:status(completed,active)]


## API Reference 

# user
#### Get all Users [token required]

 ```http
  Get / 
```


#### Get One User [token required]

 ```http
  GET /:id 
```
#### Create User [token required]

 ```http
  POST /
```

| request body       | Type     | Description                       |
| :--------          | :------- | :-------------------------------- |
| `firstName`     | `string` | **Required**. |
| `lastName`     | `string` | **Required**.  |
| `password`     | `string` | **Required**.  |
| `username`     | `string` | **Required**.  |

#### Register

 ```http
  POST /register 
```
| request body       | Type     | Description                       |
| :--------          | :------- | :-------------------------------- |
| `firstName`     | `string` | **Required**. |
| `lastName`     | `string` | **Required**.  |
| `password`     | `string` | **Required**.  |
| `username`     | `string` | **Required**.  |



#### Login

 ```http
  GET /login 
```
| request body       | Type     | Description                       |
| :--------          | :------- | :-------------------------------- |
| `username`     | `string` | **Required**.  |
| `password`     | `string` | **Required**.  |




# Product


#### Get all Products 

 ```http
  Get /products 
```


#### Get One product 

 ```http
  GET /:id 
```
#### Create product [token required]

 ```http
  POST /product
```

| request body       | Type     | Description                       |
| :--------          | :------- | :-------------------------------- |
| `name`     | `string` | **Required**. |
| `price`     | `string` | **Required**.  |
| `category`     | `string` | **Required**.  |


#### GET Product By Category 

 ```http
  GET /product/category/:category
```


# order

#### Create Order [token required]

 ```http
  POST /orders 
```
| request body       | Type     | Description                       |
| :--------          | :------- | :-------------------------------- |
| `userId`     | `string` | **Required**. |
| `status`     | `string` | **optional**. if not specfied The value become true(active)  |

#### Get Order By Id [token required]

 ```http
  GET /orders/:id 
```

#### Get All Active Orders [token required]

 ```http
  GET /orders/user/:userId/status/active
```

#### Get All Completed Orders [token required]

 ```http
  GET /orders/user/:userId/status/Completed
```



## Data Shapes And Schemas

# uesrs
-   CREATE TablE users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        password CHAR(60) NOT NULL
    );

# products
-   CREATE TABLE products(
        id SERIAL PRIMARY KEY  ,
        name varchar ,
        category VARCHAR (100) NOT NULL ,
        price MONEY
    ); 

# Orders
-   CREATE TABLE  orders(
        id SERIAL PRIMARY KEY ,
        user_id BIGINT REFERENCES users(id),
        status BOOLEAN DEFAULT true
    );

# orders_products
-   CREATE TABLE  orders_products(
        quantity INTEGER ,
        order_id BIGINT REFERENCES orders(id),
        product_id BIGINT REFERENCES products(id)
    );




#### Product 
- id
- name
- price
- [OPTIONAL] category

#### User 
- id
- firstName
- lastName
- password

#### Orders 

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
