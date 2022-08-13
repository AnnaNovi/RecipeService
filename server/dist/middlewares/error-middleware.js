"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const api_error_1 = require("../exeptions/api-error");
function errorMiddleware(err, req, res, next) {
    console.log(err);
    if (err instanceof api_error_1.ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Unexpected error: ' + err.message });
}
exports.errorMiddleware = errorMiddleware;
