"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const worker_controller_1 = require("../controllers/worker.controller");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, worker_controller_1.getWorkers);
router.get('/:id', worker_controller_1.getWorker);
router.delete('/:id', worker_controller_1.deleteWorker);
router.post('/', worker_controller_1.postWorker);
router.put('/:id', worker_controller_1.putWorker);
exports.default = router;
