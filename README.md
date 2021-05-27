# simple-rest-api-nodejs
A simple REST API template using NodeJS.

## Install dependencies
```
npm install
```

## Create environment variables using Nodemon (nodemon.json)
```
{
    "env": {
        "YOUR_MONGO_VARIABLE_NAME": "your_mongo_db_password",
        "YOU_JWT_VARIABLE_NAME": "your_sever_secret_key"
    }
}
```

## Running the Server
```
nodemon server.js
```
or
```
npm start
```
