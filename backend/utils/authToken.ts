import express from 'express'
import * as jwt from "jsonwebtoken"
import { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import {UserRecord} from '../records/user.records'


/*1. Tworzysz  funkcję tworzącą token. Funkcja jako argument przyjmuje usera a zwraca obiekt {expiresIn, token}. W funkcji korzysasz z metody sign z paczki jsonwebtoken. Potrzebujesz też obiektu z danymi, które będziesz chciał zakodować w tym tokenie (tutaj propozycja, by było to samo id usera. Potrzebujesz też sekretnego klucza (którym musisz sobie stworzyć  - dowolny ciąg znaków). Powinieneś oprzeć się wiedzą z dokumentacji */


interface UserPayload extends JwtPayload {
    id: string;
    userName: string;
    email: string;
    password: string | number;
}

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user: UserRecord): string => {
    return jwt.sign({
        id: user.id,
        email: user.email,
    },
        JWT_SECRET, {
        expiresIn: '1min',
    });
}

// res.cookie("access_token", generateToken, {     // <== Cannot find name 'res'.
//     httpOnly: true
// })





