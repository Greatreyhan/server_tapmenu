"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProductResponse = toProductResponse;
function toProductResponse(product) {
    return {
        id: product.id,
        image: product.image,
        title: product.title,
        description: product.description,
        price: product.price,
        click: product.click,
        qty: product.qty,
        status: product.status,
        type: product.type
    };
}
