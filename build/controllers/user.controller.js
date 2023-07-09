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
exports.register = void 0;
const ormConfig_1 = require("../config/ormConfig");
const user_entity_1 = require("../Entity/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = ormConfig_1.datasource.getRepository(user_entity_1.User);
console.log(userRepository);
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        // console.log(firstName);
        const user = yield userRepository.findOneBy({
            email,
        });
        if (user)
            return res.status(402).json({
                message: "Email already exist, you can login if you already have an accoun",
            });
        const hassedPassword = bcrypt_1.default.hashSync(password, 12);
        const userTemp = new user_entity_1.User();
        userTemp.firstName = firstName;
        userTemp.lastName = lastName;
        userTemp.email = email;
        userTemp.password = hassedPassword;
        const info = yield userRepository.save(userTemp);
        return res.status(201).json({ "sucessfully registered": info });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ err1: err });
    }
});
exports.register = register;
//# sourceMappingURL=user.controller.js.map