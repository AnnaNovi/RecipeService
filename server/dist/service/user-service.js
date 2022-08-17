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
exports.UserService = void 0;
const user_model_1 = require("../models/user-model");
const token_service_1 = require("./token-service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const user_dto_1 = require("../dtos/user-dto");
const api_error_1 = require("../exeptions/api-error");
class UserService {
    static registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield user_model_1.UserModel.findOne({ email });
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(`User with such email as ${email} already exists.`);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const activationLink = (0, uuid_1.v4)();
            const user = yield user_model_1.UserModel.create({
                email,
                password: hashPassword,
            });
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.TokenService.generateToken(Object.assign({}, userDto));
            yield token_service_1.TokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email });
            if (!user) {
                throw api_error_1.ApiError.BadRequest(`User with such email as ${email} doesn't exist.`);
            }
            const isPasswordEqual = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordEqual) {
                throw api_error_1.ApiError.BadRequest(`Wrong password`);
            }
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.TokenService.generateToken(Object.assign({}, userDto));
            yield token_service_1.TokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    static logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.TokenService.removeToken(refreshToken);
            return token;
        });
    }
    static refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const userData = token_service_1.TokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.TokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            //@ts-expect-error
            const user = yield user_model_1.UserModel.findById(tokenFromDb.id);
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.TokenService.generateToken(Object.assign({}, userDto));
            yield token_service_1.TokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.UserModel.find();
            return users;
        });
    }
}
exports.UserService = UserService;
