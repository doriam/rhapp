"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_routes_1 = __importDefault(require("../routes/worker.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo por el puuerto', this.port);
        });
    }
    //tranforme l'info en un variable type json
    middlewares() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/api/workers', worker_routes_1.default);
    }
}
exports.default = Server;
