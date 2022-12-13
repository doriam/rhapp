import { Request, Response } from 'express';
import connection from '../db/connection';


export const getWorkers = (req: Request, res: Response) => {
    connection.query('SELECT * FROM worker', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
}

export const getWorker = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM worker where id_worker=?', id, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data[0]);
        }
    })
}

export const deleteWorker = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('DELETE FROM worker where id_worker=?', id, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                msg: 'Worker deleted'
            });
        }
    })
}

export const postWorker = (req: Request, res: Response) => {
    const { body } = req;

    connection.query('INSERT INTO worker set ?', [body], (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                msg: 'Worker posted',
            })
        }
    })


}

export const putWorker = (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;


    connection.query('UPDATE worker set ? WHERE id_worker = ?', [body, id], (err, data) => {
        if (err) throw err;
        res.json({
            msg: 'Worker data updated',
        })
    })

}