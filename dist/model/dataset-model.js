"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDatasetResponse = toDatasetResponse;
function toDatasetResponse(dataset) {
    return {
        id: dataset.id,
        name: dataset.name
    };
}
