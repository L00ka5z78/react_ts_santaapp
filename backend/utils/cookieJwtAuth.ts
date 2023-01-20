import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'


exports.cookieJwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.MY_SECRET);
        // req.user = user;        // <=== Property 'user' does not exist on type 'Request  >'.
        next();

    } catch(err) {
        res.clearCookie("token")
        return res
            .json('Cookie cleared')
    }
}

// mozliwe że niepotrzebnie dałem to do osobnego pliku