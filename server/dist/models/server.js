"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_routes_1 = __importDefault(require("../routes/worker.routes"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        this.connectDB();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Application lancé sur le port : ', this.port);
        });
    }
    //tranforme l'info en un variable type json
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/workers', worker_routes_1.default);
    }
    connectDB() {
        connection_1.default.connect((err) => {
            if (err) {
                return err;
            }
            ;
            console.log("Bien connecté");
        });
    }
}
exports.default = Server;
