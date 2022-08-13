"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const user_router_1 = require("./router/user-router");
const error_middleware_1 = require("./middlewares/error-middleware");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/api', user_router_1.userRouter);
app.use(error_middleware_1.errorMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.DB_URL) {
            yield mongoose_1.default.connect(process.env.DB_URL);
        }
        app.listen(PORT, () => {
            console.log(`server started on port = ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
