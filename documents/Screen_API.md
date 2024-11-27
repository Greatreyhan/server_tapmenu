# Screen API Spec

## Create Screen
Request Header:
- API-TOKEN

Endpoint : POST /api/screens

Request Body:
```json
{
    "id" : "a3r2dfsaer3ww",
    "name" : "test",
    "link" : "/reyhan/",
    "page" : 2
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Create screen",
    "data":{
        "name" : "test"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Error create screen",
    "data":{}
}
```

## Read screen

Endpoint : GET /api/screens/:id_screen

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get screen",
    "data":{
        "name" : "test"
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

## Update screen

Endpoint : PATCH /api/screens/:id_screen

Request Header:
- API-TOKEN

Request Body:
```json
{
    "id":"a3r2dfsaer3ww",
    "name" : "test"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Update screen",
    "data":{
        "name" : "test"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Token invalid",
    "data":{}
}
```

## Delete screen

Endpoint : DELETE /api/screens/:id_screen

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Delete screen",
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

## Get List screen

Endpoint : GET /api/screens

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get screen",
    "data":{
        [
            "id" : "uuid",
            "name" : "test1"
        ],
        [
            "id" : "uuid",
            "name" : "test2"
        ],
        [
            "id" : "uuid",
            "name" : "test3"
        ],
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