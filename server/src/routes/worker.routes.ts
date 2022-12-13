import { Router } from 'express';
import { getWorkers, getWorker, deleteWorker, postWorker, putWorker } from '../controllers/worker.controller'

const router = Router();

router.get('/', getWorkers);
router.get('/:id', getWorker);
router.delete('/:id', deleteWorker);
router.post('/', postWorker)
router.put('/:id', putWorker)
export default router;