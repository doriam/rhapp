"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const jwt = __importStar(require("jsonwebtoken"));
'Objet envoyé à la base de données pour créer un nouveau utilisateur avec son profil daccès';
const newUser = (req, res) => {
    console.log(req.body);
    const { body } = req;
    connection_1.default.query('INSERT INTO user set ?', [body], (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                msg: 'User added',
            });
        }
    });
};
exports.newUser = newUser;
//Objet envoyé à la base de données pour vérifier que l'utilisateur et le password saisis dans le formulaire sont correct
const loginUser = (req, res) => {
    const username = req.body.u_name;
    const password = req.body.u_password;
    connection_1.default.query('SELECT id_worker FROM user where u_name=? AND u_password=md5(?)', [username, password], (err, result, fields) => {
        if (!err) {
            if (result.length > 0) {
                //let data = JSON.stringify(result[0]);
                let id = result[0];
                const token = jwt.sign({ id: id.id_worker }, process.env.SECRET_KEY || 'TEST123');
                res.json(token);
            }
            else {
                res.status(400).json({
                    msg: 'Email ou mot de passe incorrect'
                });
            }
        }
        else {
            console.log(err);
        }
    });
};
exports.loginUser = loginUser;
