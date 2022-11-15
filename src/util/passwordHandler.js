"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    const passwordWithPepper = password + process.env.PASS_PEPPER;
    return await bcrypt_1.default.hash(passwordWithPepper, parseInt(process.env.SALT_ROUNDS));
};
exports.hashPassword = hashPassword;
const comparePassword = async (inputPassword, hashedPassword) => {
    const passwordWithPepper = inputPassword + process.env.PASS_PEPPER;
    return await bcrypt_1.default.compare(passwordWithPepper, hashedPassword);
};
exports.comparePassword = comparePassword;
