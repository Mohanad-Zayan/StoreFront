
## Installation

# Packages Installation

```bash
  $ npm install
```
    
# DataBase setup 

```bash
  $ psql -U postgres
```
```bash
  $ CREATE DATABASE frontStore;
  $ CREATE DATABASE frontStore_test;
```

```bash
  $  npx db-migrate up;
```

# Enviroment setup

## .env

```bash
  ENV=DEV

  POSTGRES_HOST= 127.0.0.1  
  POSTGRES_DB= frontStore
  POSTGRES_USER=owner
  POSTGRES_PASSWORD= password1234
  POSTGRES_PORT= 5432

  #test_DB
  POSTGRES_TEST_DB= frontStore_test

  #jwt
  JWT_SECRET = secret-for-the-json-web-token  

  #password hashing
  PASS_SALT_ROUNDS= 10 
  PASS_PEPPER=extrea-addditive-to-the-password-string-to-make-it-hard-to-break-it 
```
# Start
```bash
  $ npm run start
```
# Aval Scripts

```bash
  $ npm run start
  $ npm run db:up
  $ npm run db:down
  $ npm run build
  $ npm run jasmine
  $ npm run test
```

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
| request body       | Type     | Description                       |
| :--------          | :------- | :-------------------------------- |
| `userId`     | `string` | **Required**. |
| `status`     | `string` | **optional**. if not specfied The value become true(active)  |

#### Create Order 

 ```http
  POST /orders 
```

#### Get Order By Id 

 ```http
  GET /orders/:id 
```

#### Get All Active Orders 

 ```http
  GET /orders/user/:userId/status/active
```

#### Get All Completed Orders 

 ```http
  GET /orders/user/:userId/status/Completed
```
