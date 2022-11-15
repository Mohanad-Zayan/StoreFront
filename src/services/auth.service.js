"use strict";
//class register login
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_helper_1 = __importDefault(require("../helpers/env.helper"));
const user_1 = require("../models/user");
const passwordHandler_1 = require("../util/passwordHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _UserModel = new user_1.UserModel();
class AuthService {
    generateToken(id) {
        return jsonwebtoken_1.default.sign({ id }, (0, env_helper_1.default)('JWT_SECRET'));
    }
    ;
    async register(u) {
        return await _UserModel.create(u);
    }
    async login(userName, password) {
        // get user from database
        const dbUser = await _UserModel.getByUsername(userName);
        // if user is not found, return throw error
        if (dbUser == null)
            throw new Error("User not found");
        // compare passwords
        const isMatch = await (0, passwordHandler_1.comparePassword)(password + (0, env_helper_1.default)("PASS_PEPPER"), dbUser.password);
        // if passwords don't match, throw error
        if (!isMatch)
            throw new Error("Incorrect password");
        // generate token
        const token = this.generateToken(dbUser.id);
        // if passwords match, return user
        // delete dbUser.password;
        return { ...dbUser, token };
    }
}
exports.default = AuthService;
