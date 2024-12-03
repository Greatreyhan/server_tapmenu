"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDatasetOnElementResponse = toDatasetOnElementResponse;
function toDatasetOnElementResponse(data) {
    var _a;
    return {
        id_dataset: data.id_dataset,
        id_element: data.id_element,
        assigned_at: (_a = data.assigned_at) !== null && _a !== void 0 ? _a : new Date(),
    };
}
