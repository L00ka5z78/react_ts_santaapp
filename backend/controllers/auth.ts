import { Request, Response } from 'express';
import { pool } from '../utils/db';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

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
        'INSERT INTO `users`(`username`, `email`, `password`) VALUES (?, ?, ?)';

      const value = [req.body.username, req.body.email, hash];

      pool.query(userData, value),
        (err: string, data: string) => {
          if (err) return res.json(err);
          return res.status(200).json('User has been created');
          console.log(data);
        };
    };
};

export const login = (req: Request, res: Response) => {
  //check if user exist
  const userData = 'SELECT * FROM `users` WHERE `username` = ?';
  const value = [req.body.username];

  pool.query(userData, value),
    (err: string, data: string | any) => {
      if (err) return res.json(err);
      if (data.length === 0) return res.status(404).json('User not found');
      //check if password is correct

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (isPasswordCorrect)
        return res.status(400).json('Wrong username or password');

      const token = jwt.sign({ id: data[0].id }, 'jwtkey');
      const { password, ...otherData } = data[0];

      res
        .cookie('acces_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(otherData);
    };
};

export const logout = () => {};
