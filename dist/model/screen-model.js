"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toScreenResponse = toScreenResponse;
function toScreenResponse(screen) {
    return {
        id: screen.id,
        name: screen.name,
        endpoint: screen.endpoint
    };
}
