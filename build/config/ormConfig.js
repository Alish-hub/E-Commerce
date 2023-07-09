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
exports.datasource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../Entity/user.entity");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.datasource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        user_entity_1.User,
        // "./src/Entity/user.entity.ts"
    ],
});
exports.datasource
    .initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("connection initialized with database...");
}))
    .catch((err) => console.log({ erroreMessage: err }));
//# sourceMappingURL=ormConfig.js.map