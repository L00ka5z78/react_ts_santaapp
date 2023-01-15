import { Router, Request, Response } from 'express';
import HttpException from '../utils/httpException'
import { UserRecord } from '../records/user.records';
import { CreateUserReq, GetSingleUserRes, UserEntity } from '../types/user';
import { ValidationError } from '../utils/error';

export const userRouter = Router();

userRouter
    // .post('/login', async (req:Request, res): Promise<void> => {
    //     const newUser = new UserRecord(req.body);
    //     await newUser.insert();
    //     res.json(newUser);
    // });

    .post('/register', async (req: Request<unknown>, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new HttpException( 'Please include email and password.', 400,);
        }


    // const user = await UserRecord.getUserByEmail(email);
    // if (!user) {
    //     throw new WrongCredentialsException();
    // }
    // const isMatched = await bcrypt.compare(password, user.password);
    // if (!isMatched) {
    //     throw new WrongCredentialsException();
    // }

    // const accessTokenData = createAccessToken(await generateCurrentToken(user), user.id);
    //
    // delete user.password;
    // delete user.currentToken;

    // res
    //     .cookie(CookiesNames.AUTHORIZATION, accessTokenData.accessToken, {
    //         maxAge: accessTokenData.expiresIn * 1000, // Example: JWT_ACCESS_TOKEN_EXPIRATION_TIME=3600 => Expires in 1 hour (3600 seconds * 1000 milliseconds).
    //         secure: false,
    //         domain: 'localhost',
    //         httpOnly: true,
    //     })
    //     .status(200)
    //     .json(user as UserLoginRes);
});
