"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putWorker = exports.postWorker = exports.deleteWorker = exports.getWorker = exports.getWorkers = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getWorkers = (req, res) => {
    connection_1.default.query('SELECT * FROM worker', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
};
exports.getWorkers = getWorkers;
const getWorker = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM worker where id_worker=?', id, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data[0]);
        }
    });
};
exports.getWorker = getWorker;
const deleteWorker = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('DELETE FROM worker where id_worker=?', id, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                msg: 'Worker deleted'
            });
        }
    });
};
exports.deleteWorker = deleteWorker;
const postWorker = (req, res) => {
    const { body } = req;
    connection_1.default.query('INSERT INTO worker set ?', [body], (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                msg: 'Worker posted',
            });
        }
    });
};
exports.postWorker = postWorker;
const putWorker = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query('UPDATE worker set ? WHERE id_worker = ?', [body, id], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Worker data updated',
        });
    });
};
exports.putWorker = putWorker;
