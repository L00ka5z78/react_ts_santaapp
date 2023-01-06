import { Request, Response } from 'express';
import { pool } from '../utils/db';
import * as bcrypt from 'bcryptjs';

export const register = (req: Request, res: Response) => {
  // check if user exist

  const userData = 'SELECT * FROM `users` WHERE `email` = ? OR `username` = ?';
  let value = [req.body.email, req.body.username];

  pool.query(userData, value),
    (err: string, data: string) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json('User already exists');

      // hash the password and create user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const userData =
        'INSERT INTO `users` (`username`, `email`, `password`) VALUES (?)';
      const value = [req.body.username, req.body.email, hash];

      pool.query(userData, value),
        (err: string, data: string) => {
          if (err) return res.json(err);
          return res.status(200).json('User has been created');
          console.log(data);
        };
    };
};

export const login = () => {};

export const logout = () => {};
