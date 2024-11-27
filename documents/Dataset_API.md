# Dataset API Spec

## Create Dataset
Request Header:
- API-TOKEN

Endpoint : POST /api/datasets

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
    "message":"Success Create Dataset",
    "data":{
        "name" : "test"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Error create Dataset",
    "data":{}
}
```

## Read Dataset

Endpoint : GET /api/datasets/:id_dataset

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get Dataset",
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

## Update Dataset

Endpoint : PATCH /api/datasets

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
    "message":"Success Update Dataset",
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

## Delete Dataset

Endpoint : DELETE /api/datasets/:id_dataset

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Delete Dataset",
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

## Get List Dataset

Endpoint : GET /api/datasets

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get Dataset",
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