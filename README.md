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
        "MONGO_ATLAS_PW": "your_mongo_db_password",
        "JWT_KEY": "your_sever_secret_key"
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
