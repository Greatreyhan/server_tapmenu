"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toElementResponse = toElementResponse;
function toElementResponse(element) {
    return {
        id: element.id,
        name: element.name,
        type: element.type,
        content: element.content,
        properties: element.properties,
        style: element.style,
    };
}
