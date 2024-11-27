# User API Spec

## Register User

Endpoint : POST /api/users

Request Body:
```json
{
    "email":"reyhan@gmail.com",
    "username" : "reyhan",
    "password":"reyhan123"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Create Users",
    "data":{
        "email":"reyhan@gmail.com",
        "username" : "reyhan"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Error create user",
    "data":{}
}
```

## Login User

Endpoint : POST /api/login

Request Body:
```json
{
    "email":"reyhan@gmail.com",
    "password":"reyhan123"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Login",
    "data":{
        "email":"reyhan@gmail.com",
        "username" : "reyhan",
        "token":"uuid"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Username or password invalid",
    "data":{}
}
```

## Get User

Endpoint : GET /api/users

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get User",
    "data":{
        "email":"reyhan@gmail.com",
        "password":"reyhan123",
        "whatsapp_number": "099098989",
        "address":"pondok",
        "username":"reyhan"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Token Invalid",
    "data":{}
}
```

## Update User

Endpoint : PATCH /api/users

Request Header:
- API-TOKEN

Request Body:
```json
{
    "email":"reyhan@gmail.com",
    "password":"reyhan123",
    "whatsapp_number": "099098989",
    "address":"pondok",
    "username":"reyhan"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Update User",
    "data":{
        "email":"reyhan@gmail.com",
        "password":"reyhan123",
        "whatsapp_number": "099098989",
        "address":"pondok",
        "username":"reyhan"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Token Invalid",
    "data":{}
}
```

## Logout User

Endpoint : DELETE /api/users

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Logout User",
    "data":{}
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Token Invalid",
    "data":{}
}
```