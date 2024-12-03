"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPageResponse = toPageResponse;
function toPageResponse(page) {
    return {
        id: page.id,
        name: page.name,
        endpoint: page.endpoint,
    };
}
