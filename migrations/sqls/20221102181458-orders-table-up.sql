CREATE TABLE  orders(

    id SERIAL PRIMARY KEY ,

    user_id BIGINT REFERENCES users(id), 
-- true => active , false => completed
    status BOOLEAN DEFAULT true  
);