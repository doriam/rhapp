import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connection from '../db/connection';
import * as jwt from 'jsonwebtoken';


'Objet envoyé à la base de données pour créer un nouveau utilisateur avec son profil daccès'
export const newUser = (req: Request, res: Response) => {
  console.log(req.body)


  const { body } = req;

  connection.query('INSERT INTO user set ?', [body], (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json({
        msg: 'User added',
      })
    }
  })
}

//Objet envoyé à la base de données pour vérifier que l'utilisateur et le password saisis dans le formulaire sont correct
export const loginUser = (req: Request, res: Response) => {
  const username = req.body.u_name;
  const password = req.body.u_password;

  connection.query('SELECT id_worker FROM user where u_name=? AND u_password=md5(?)', [username, password], (err, result, fields) => {
    if (!err) {
      if (result.length > 0) {
        //let data = JSON.stringify(result[0]);
        let id = result[0];
        const token = jwt.sign({ id: id.id_worker }, process.env.SECRET_KEY || 'TEST123');
        res.json(token)
      } else {
        res.status(400).json({
          msg: 'Email ou mot de passe incorrect'
        });
      }
    }
    else {
      console.log(err);
    }
  })
}



