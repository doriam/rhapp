"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putWorker = exports.postWorker = exports.deleteWorker = exports.getWorker = exports.getWorkers = void 0;
const getWorkers = (req, res) => {
    res.json({
        msg: 'getWorkers'
    });
};
exports.getWorkers = getWorkers;
const getWorker = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'getWorker',
        id: id
    });
};
exports.getWorker = getWorker;
const deleteWorker = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteWorker',
        id: id
    });
};
exports.deleteWorker = deleteWorker;
const postWorker = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'postWorker',
        body: body
    });
};
exports.postWorker = postWorker;
const putWorker = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    res.json({
        msg: 'postWorker',
        body: body,
        id: id
    });
};
exports.putWorker = putWorker;
