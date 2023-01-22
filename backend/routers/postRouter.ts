import {Router, Request, Response} from 'express';
import HttpException from '../utils/httpException'
import {PostRecord} from '../records/post.record';
import {generateToken} from '../utils/authToken';
import * as bcrypt from 'bcrypt'
import {CreatePostReq, GetSinglePostRes, PostEntity} from '../types/post';
import {ValidationError} from '../utils/error/error';
import RequestWithPost from "../services/interfaces/reqWithPost.interface";
import {GiftRecord} from "../records/gift.record";
import {ChildRecord} from "../records/child.record";
import RequestWithUser from "../services/interfaces/reqWithUser.interface";

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


    // get single post by title

    .get('/getPost', async (req: RequestWithPost, res: Response) => {
        const {title } = req.title;
        const post = await PostRecord.getPostByTitle(title);

        res
            .status(200)
            .json(title)
    })

    //list all posts

    .get('/getPosts', async (req: RequestWithPost, res: Response) => {

        res
            .status(200)
            .json(req.title)
    })

    // delete post

    .delete('/:id', async (req: RequestWithPost, res: Response) => {
        const post = await PostRecord.getPostById(req.params.id)

        if (!post) {
            throw new ValidationError('There is NO post!');
        }
        await post.deletePost(req.params.id)
        res
            .status(200)
            .json(req.title)
    })

    //edit post

    .put('/update/:id', async (req: RequestWithUser, res: Response) => {
        const title = await PostRecord.getPostById(req.params.id);
        if (!title) {
            throw new ValidationError('Post not found.');


        }
    })
