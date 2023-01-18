import {Router, Request, Response} from 'express';
import HttpException from '../utils/httpException'
import {UserRecord} from '../records/user.records';
import {generateToken} from '../utils/authToken';
import * as bcrypt from 'bcrypt'
import {CreateUserReq, GetSingleUserRes, UserEntity} from '../types/user';
import {ValidationError} from '../utils/error';

export const userRouter = Router();

userRouter


    .post('/register', async (req: Request<void>, res, next) => {

        const {userName, email, password} = req.body;

        if (!userName || !email || !password) {
            throw new HttpException('Please fill all required fields.', 400);
        }
        // check if user exist
        //3a. Jeśli taki użytkownik istnieje, to wyrzucasz Error. *

        const user = await UserRecord.getUserByEmail(email);
        if (user) {
            throw new ValidationError('User already exist');
        }

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
            .json(newUser);
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

        const isPasswordMatched = await bcrypt.compare(req.body.password, userName.password);

        //  userName.password === zapisany hash w bazie wygenerowany przy rejestracji
        //req.body.password to co wpisuje na stronie i compare to porównuje

        if (!isPasswordMatched) {
            throw new ValidationError("Passwords don't match!");
        }

        res.cookie("token", generateToken(user));    //
        res
            .status(200)
            .json(user)
    })


