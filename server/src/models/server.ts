import express, { Application } from 'express';
import routesWorkers from '../routes/worker.routes'
import connection from '../db/connection';
import cors from 'cors';
import routesUsers from '../routes/user.routes'

class Server {
  private app: express.Application;
  private port: string;

  //Création du constructeur pour le back-end
  constructor() {
    this.app = express(); //Permet l'utilisation de express dans l'application
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

  //Défini les routes pour lesquelles les données seront envoyés
  routes() {
    this.app.use('/api/workers', routesWorkers);
    this.app.use('/api/users', routesUsers);
  }
  //Vérifie que la connection à la base de données a éte fait correctement
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
