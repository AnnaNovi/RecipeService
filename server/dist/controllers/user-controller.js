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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
const express_validator_1 = require("express-validator");
const api_error_1 = require("../exeptions/api-error");
class UserController {
    static registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(api_error_1.ApiError.BadRequest('Body request validate error', errors.array()));
                }
                const { email, password } = req.body;
                const userData = yield user_service_1.UserService.registration(email, password);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield user_service_1.UserService.login(email, password);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield user_service_1.UserService.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
    static refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield user_service_1.UserService.refresh(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.UserService.getAllUsers();
                return res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
