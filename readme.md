# backend for mmgps


## Dependencies
    - pg-promise
    - express
    - bcrypt
    - jwt
    - dotenv
    - cors


## Paths - 

- /user/register - registers a new user
    - takes a json body in the format
        {
            "name": "John",
            "email": "email@email.com",
            "password": "password123"
        }

- /user/login - validates credentials sent from front end against email/ pass stored in DB
    - takes a JSON body in the format :
        {
            "email": "email@email.com",
            "password": "password123"
        }
    - returns a signed jwt

## SQL Table Structure

### Users 

Columns - 
    - id SERIAL PRIMARY KEY
    - name text NOT NULL
    - email text NOT NULL UNIQUE
    - password varchar NOT NULL
