# Dataset API Spec

## Create Product
Request Header:
- API-TOKEN

Endpoint : POST /api/datasets/:id_dataset/products

Request Body:
```json
{
    "id":"a3r2dfsaer3ww",
    "image" : "link",
    "title" : "test",
    "description" : "test",
    "price" : 1000,
    "click" : 100,
    "qty" : 10,
    "status" : true,
    "type" : "makanan"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Create Product",
    "data":{
        "id":"a3r2dfsaer3ww",
        "image" : "link",
        "title" : "test",
        "description" : "test",
        "price" : 1000,
        "click" : 100,
        "qty" : 10,
        "status" : true,
        "type" : "makanan"
    }
}
```

Response Error:
```json
{
    "status":"Failed",
    "message":"Error create Product",
    "data":{}
}
```

## Read Product

Endpoint : GET /api/datasets/:id_dataset/products/:id_product

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get Product",
    "data":{
        "id":"a3r2dfsaer3ww",
        "image" : "link",
        "title" : "test",
        "description" : "test",
        "price" : 1000,
        "click" : 100,
        "qty" : 10,
        "status" : true,
        "type" : "makanan"
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

## Update Product

Endpoint : PATCH /api/datasets/:id_dataset/products/:id_product

Request Header:
- API-TOKEN

Request Body:
```json
{
    "image" : "link",
    "title" : "test",
    "description" : "test",
    "price" : 1000,
    "click" : 100,
    "qty" : 10,
    "status" : true,
    "type" : "makanan"
}
```

Response Body:
```json
{
    "status":"OK",
    "message":"Success Update Product",
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

## Delete Product

Endpoint : DELETE /api/datasets/:id_dataset/products/:id_product

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Delete Product",
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

## Get List Product

Endpoint : GET /api/datasets/:id_dataset/products

Request Header:
- API-TOKEN

Response Body:
```json
{
    "status":"OK",
    "message":"Success Get Product",
    "data":{
        [
            "id":"a3r2dfsaer3ww",
            "image" : "link",
            "title" : "test",
            "description" : "test",
            "price" : 1000,
            "click" : 100,
            "qty" : 10,
            "status" : true,
            "type" : "makanan"
        ],
        [
            "id":"a3r2dfsaer3ww",
            "image" : "link",
            "title" : "test",
            "description" : "test",
            "price" : 1000,
            "click" : 100,
            "qty" : 10,
            "status" : true,
            "type" : "makanan"
        ],
        [
            "id":"a3r2dfsaer3ww",
            "image" : "link",
            "title" : "test",
            "description" : "test",
            "price" : 1000,
            "click" : 100,
            "qty" : 10,
            "status" : true,
            "type" : "makanan"
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