"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_routes_1 = __importDefault(require("../routes/worker.routes"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
class Server {
    //Création du constructeur pour le back-end
    constructor() {
        this.app = (0, express_1.default)(); //Permet l'utilisation de express dans l'application
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
    //Défini les routes pour lesquelles les données seront envoyés
    routes() {
        this.app.use('/api/workers', worker_routes_1.default);
        this.app.use('/api/users', user_routes_1.default);
    }
    //Vérifie que la connection à la base de données a éte fait correctement
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
