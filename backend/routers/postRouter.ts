import {Router, Request, Response} from 'express';
import HttpException from '../utils/httpException'
import {UserRecord} from '../records/user.records';
import {generateToken} from '../utils/authToken';
import * as bcrypt from 'bcrypt'
import {CreateUserReq, GetSingleUserRes, UserEntity} from '../types/user';
import {ValidationError} from '../utils/error/error';
import {authMiddleware} from "../middleware/authMiddleware";
import RequestWithUser from "../services/reqWithUser.interface";

export const userRouter = Router();

postRouter

    .post('/register', async (req: Request<void>, res, next) => {

        const {postName, email, password} = req.body;

        if (!postName || !email || !password) {
            throw new HttpException('Please fill all required fields.', 400);
        }

        //6. Zapisujesz użytkownika do bazy danych*

        await newUser.addUserToDatabase()
        res
            .status(201)
            .json(newUser)
    })


    .post('/login', async (req: Request, res: Response, next) => {
        const {userName, email, password} = req.body;

        if (!postName || !email || !password) {
            throw new HttpException('Please fill all required fields.', 400);
        }

        // 3. Pobranie użytkownika z bazy na podstawie maila (jeśli nie ma to wyrzucasz błąd)

        const user = await UserRecord.getUserByEmail(email);
        if (!user) {
            throw new ValidationError('There is no user');
        }


        /*  2. Mając już tą funkcję w /login już po sprawdzeniu hasła, odpalasz tą funkcje z pkt 1 i przypisujesz ją do zmiennej.*/
        // 3. Następnie przekazujesz odpowiednie dane do coookie

        res.cookie("token", generateToken(user), {
            maxAge: 1000 * 60,
            httpOnly: true,
            secure: false,
            domain: "localhost",
        })
            .status(200)
            .json(user as UserRecord)
    })


    /*
        Dodaj też np ścieżkę user/profile i spróbują ja uwierzytelnić, i jak się uda to niech w json zwroci zalogowanego użytkownika.
        .*/

    .get('/profile', authMiddleware, async (req: RequestWithUser, res: Response) => {

        res
            .status(200)
            .json(req.user)
    })
