"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const express_validator_1 = require("express-validator");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/registration', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 4, max: 32 }), user_controller_1.UserController.registration);
exports.userRouter.post('/login', user_controller_1.UserController.login);
exports.userRouter.post('/logout', user_controller_1.UserController.logout);
exports.userRouter.get('/refresh', user_controller_1.UserController.refresh);
exports.userRouter.get('/users', user_controller_1.UserController.getUsers);
