import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers['authorization']
  if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
    //On enlève le 'Bearer' au token pour vérifier qu'il est valide
    try {
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || 'TEST123')
      next();
    } catch (error) {
      res.status(401).json({
        msg: 'Token non valide'
      })
    }

  }
  else {
    res.status(401).json({
      msg: 'Accès interdit'
    })
  }
}

export default validateToken;
