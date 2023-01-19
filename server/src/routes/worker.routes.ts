import { Router } from 'express';
import { getWorkers, getWorker, deleteWorker, postWorker, putWorker } from '../controllers/worker.controller'
import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken, getWorkers);
router.get('/:id', getWorker);
router.delete('/:id', deleteWorker);
router.post('/', postWorker);
router.put('/:id', putWorker);
export default router;
