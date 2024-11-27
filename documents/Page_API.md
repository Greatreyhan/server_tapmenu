# Pages API Spec

## Create Pages
Request Header:
- API-TOKEN

Endpoint : POST /api/screens/:id_screen/pages

Request Body:
```json
{
    "id" : "a3r2dfsaer3ww",
    "name" : "test",
    "endpoint" : "/reyhan/",
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Create Page",
    "data":{
        "name" : "test",
        "endpoint" : "/reyhan/"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Error create Page",
    "data":{}
}
```

## Read Page

Endpoint : GET /api/screens/:id_screen/pages/:id_page

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get Page",
    "data":{
        "name" : "test",
        "endpoint" : "/reyhan/",
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

## Update Pages

Endpoint : PATCH /api/screens/:id_screen/pages/:id_page

Request Header:
- API-TOKEN

Request Body:
```json
{
    "name" : "test",
    "endpoint" : "/reyhan/"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Update Page",
    "data":{
        "name" : "test",
        "endpoint" : "/reyhan/"
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

## Delete Pages

Endpoint : DELETE /api/screens/:id_screen/pages/:id_page

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Delete Page",
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

## Get List Pages

Endpoint : GET /api/screens/:id_screen/pages

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get screen",
    "data":{
        [
            "id" : "a3r2dfsaer3ww",
            "name" : "test1",
            "endpoint" : "/reyhan/"
        ],
        [
            "id" : "a3r2dfsaer3ww",
            "name" : "test2",
            "endpoint" : "/reyhan/"
        ]
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