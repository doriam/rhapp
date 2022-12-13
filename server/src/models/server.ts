import express, { Application } from 'express';
import routesWorkers from '../routes/worker.routes'
import connection from '../db/connection';
import cors from 'cors';

class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        this.connectDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Application lancé sur le port : ', this.port);
        })
    }

    //tranforme l'info en un variable type json
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use('/api/workers', routesWorkers);
    }

    connectDB() {
        connection.connect((err) => {
            if (err) {
                return err
            };
            console.log("Bien connecté");
        })
    }
}

export default Server;