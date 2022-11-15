CREATE TablE users (
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL
)  ;