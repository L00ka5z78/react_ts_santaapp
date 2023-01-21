import {NextFunction, request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import RequestWithUser from '../services/interfaces/reqWithUser.interface';
import {UserRecord} from "../records/user.records";
import {ValidationError} from "../utils/error/error";


interface DataStoredInToken {
    id: string;
}

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    if (cookies && cookies.token) {

        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(cookies.token, secret) as DataStoredInToken;
            const id = verificationResponse.id;
            const user = await UserRecord.getUserById(id);

            if (user) {
                req.user = user;
                next();
            }
        } catch(err) {
           throw new ValidationError();
        }
    } else {
        throw new ValidationError()
    }

}