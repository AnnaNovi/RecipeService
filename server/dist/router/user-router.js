"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/registration', user_controller_1.UserController.registration);
exports.userRouter.post('/login', user_controller_1.UserController.login);
exports.userRouter.post('/logout', user_controller_1.UserController.logout);
exports.userRouter.get('/activate/:link', user_controller_1.UserController.activate);
exports.userRouter.get('/refresh', user_controller_1.UserController.refresh);
exports.userRouter.get('/users', user_controller_1.UserController.getUser);
