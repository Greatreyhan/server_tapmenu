# Element API Spec

## Create Element
Request Header:
- API-TOKEN

Endpoint : POST /api/screens/:id_screen/pages/:id_page/elements

Request Body:
```json
{
    "id" : "a3r2dfsaer3ww",
    "name" : "test",
    "type" : "makanan",
    "content" : "{JSON}",
    "properties" : "{JSON}",
    "style" : "{JSON}"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Create Element",
    "data":{
        "name" : "test",
        "type" : "makanan",
        "content" : "{JSON}",
        "properties" : "{JSON}",
        "style" : "{JSON}"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Error create Element",
    "data":{}
}
```

## Read Element

Endpoint : GET /api/screens/:id_screen/pages/:id_page/elements/:id_element

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get Element",
    "data":{
        "name" : "test",
        "type" : "makanan",
        "content" : "{JSON}",
        "properties" : "{JSON}",
        "style" : "{JSON}",
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

## Update Element

Endpoint : PATCH /api/screens/:id_screen/pages/:id_page/elements/:id_element

Request Header:
- API-TOKEN

Request Body:
```json
{
    "name" : "test",
    "type" : "makanan",
    "content" : "{JSON}",
    "properties" : "{JSON}",
    "style" : "{JSON}"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Update Element",
    "data":{
        "name" : "test",
        "type" : "makanan",
        "content" : "{JSON}",
        "properties" : "{JSON}",
        "style" : "{JSON}"
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

Endpoint : DELETE /api/screens/:id_screen/pages/:id_page/elements/:id_element

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Delete Element",
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

## Get List Element

Endpoint : GET /api/screens/:id_screen/pages/:id_page/elements

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get Element",
    "data":{
        [
            "id" : "a3r2dfsaer3ww",
            "name" : "test",
            "type" : "makanan",
            "content" : "{JSON}",
            "properties" : "{JSON}",
            "style" : "{JSON}"
        ],
        [
            "id" : "a3r2dfsaer3ww",
            "name" : "test",
            "type" : "makanan",
            "content" : "{JSON}",
            "properties" : "{JSON}",
            "style" : "{JSON}"
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