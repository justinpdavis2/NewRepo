Important steps in order to run the server

1. Be sure to have a MySQL database setup with the proper tables (In the SQL dir there is a .SQL file with the tables)
2. You will need to create a file in the server dir called db_config.json and it will need to be formatted as so 
    
    {
        "host": "HOST_NAME",
        "user": "USERNAME",
        "password": "PASSWORD",
        "database": "DATABASE_NAME"
    }

    Be sure to replace the values on the right with your own values
3. run `npm install`
4. run `node index.js` if you are working in a development enviorment use `npm run devStart`