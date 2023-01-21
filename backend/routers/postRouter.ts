import {Router, Request, Response} from 'express';
import HttpException from '../utils/httpException'
import {UserRecord} from '../records/user.records';
import {generateToken} from '../utils/authToken';
import * as bcrypt from 'bcrypt'
import {CreatePostReq, GetSinglePostRes, PostEntity} from '../types/post';
import {ValidationError} from '../utils/error/error';
import {authMiddleware} from "../middleware/authMiddleware";
import RequestWithUser from "../services/reqWithUser.interface";
import {PostRecord} from "../records/post.record";

export const postRouter = Router();

postRouter

    .post('/addPost', async (req: Request<void>, res, next) => {
        const {title, } = req.body;
        if (!title ) {
            throw new HttpException('There is no post with given ID', 400);
        }
        await title.addPost()
        res
            .status(201)
            .json(title)
    })


    // .post('/addPost', async (req: Request, res: Response, next) => {
    //
    //
    //     const user = await UserRecord.getUserByEmail(email);
    //     if (!user) {
    //         throw new ValidationError('There is no user');
    //     }
    //
    //     res.cookie("token", generateToken(user), {
    //         maxAge: 1000 * 60,
    //         httpOnly: true,
    //         secure: false,
    //         domain: "localhost",
    //     })
    //         .status(200)
    //         .json(title as PostRecord)
    // })


    .get('/getPost', authMiddleware, async (req: RequestWithUser, res: Response) => {

        res
            .status(200)
            .json(req.user)
    })

    .get('/getPosts', authMiddleware, async (req: RequestWithUser, res: Response) => {

        res
            .status(200)
            .json(req.user)
    })
    .get('/delete', authMiddleware, async (req: RequestWithUser, res: Response) => {

        res
            .status(200)
            .json(req.user)
    })

    .put('/update', authMiddleware, async (req: Request, res: Response) => {

    })
