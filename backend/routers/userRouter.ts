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

userRouter

    .post('/register', async (req: Request<void>, res, next) => {

        const {userName, email, password} = req.body;

        if (!userName || !email || !password) {
            throw new HttpException('Please fill all required fields.', 400);
        }
        // check if user exist

        // const user = await UserRecord.getUserByEmail(email);
        // if (user) {
        //     throw new ValidationError('User already exist');
        // }
        //******************************* JAK TEN IF JEST to WYWALA BACKEND PRZY REJESTRACJI

        // hash the password and create user

        const saltRounds = 10;
        const usersPassword = req.body.password;

        const hashedPassword = await bcrypt.hash(usersPassword, saltRounds)


        const newUser = new UserRecord({
            /*  UserRecord ma w sobie jeszcze metody, i wtedy on krzyczy, że ich nie podałeś...
a do obiektu chcesz podać tylko pewne zmienne. */
            userName,
            email,
            password: hashedPassword,
        })
        //6. Zapisujesz użytkownika do bazy danych*

        await newUser.addUserToDatabase()
        res
            .status(201)
            .json(newUser)
    })


    .post('/login', async (req: Request, res: Response, next) => {
        const {userName, email, password} = req.body;

        if (!userName || !email || !password) {
            throw new HttpException('Please fill all required fields.', 400);
        }

        // 3. Pobranie użytkownika z bazy na podstawie maila (jeśli nie ma to wyrzucasz błąd)

        const user = await UserRecord.getUserByEmail(email);
        if (!user) {
            throw new ValidationError('There is no user');
        }

        // 4. Sprawdzanie czy hasło zgadza się z tym w bazie (poprzez porównanie hasła z req.body z hashem z bazy) (jeśli złe hasło to wyrzucasz błąd)

        const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);

        //  userName.password === zapisany hash w bazie wygenerowany przy rejestracji
        //req.body.password to co wpisuje na stronie i compare to porównuje

        if (!isPasswordMatched) {
            throw new ValidationError("Passwords don't match!");
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

    .post('/logout', async (req: Request, res: Response) => {

        res.clearCookie('token', {
            maxAge: 0,
            httpOnly: true,
            secure: false,
            domain: "localhost",
        })
            .status(200)
            .json("You are logged out!")
    })

    /*
        Dodaj też np ścieżkę user/profile i spróbują ja uwierzytelnić, i jak się uda to niech w json zwroci zalogowanego użytkownika.
        .*/

    .get('/profile', authMiddleware, async (req: RequestWithUser, res: Response) => {

        res
            .status(200)
            .json(req.user)
    })
