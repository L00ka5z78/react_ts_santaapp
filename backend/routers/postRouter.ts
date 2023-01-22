import {Router, Request, Response} from 'express';
import HttpException from '../utils/httpException'
import {PostRecord} from '../records/post.record';
import {generateToken} from '../utils/authToken';
import {CreatePostReq, GetSinglePostRes, PostEntity} from '../types/post';
import {ValidationError} from '../utils/error/error';
import RequestWithPost from "../services/interfaces/reqWithPost.interface";

export const postRouter = Router();

postRouter

    // ******  CRUD OPERATIONS *****


    // create post

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
        const {title} = req.title;
        const post = await PostRecord.getPostByTitle(title);

        res
            .status(200)
            .json(title)
    })

    // get single post by id

    .get('/getPost', async (req: RequestWithPost, res: Response) => {
       const id = req.id
        const post = await PostRecord.getPostById(id);

        res
            .status(200)
            .json(id)
    })

    //list all posts

    .get('/', async (req: RequestWithPost, res: Response) => {
        const posts = await PostRecord.getAllPosts();
        res
            .status(200)
            .json(req.title)
    })

    //edit post

    .put('/update/:id', async (req: RequestWithPost, res: Response) => {

        const post = await PostRecord.getPostById(req.params.id);

        if (!post.title || !post.id) {
            throw new ValidationError('Post not found.');
        }

        post.id = req.body.id;
        post.title = req.body.title;
        post.desc = req.body.desc;
        post.img = req.body.img;
        post.date = req.body.date;
        post.uid = req.body.uid;
        post.cat = req.body.cat;
        await post.updatePost()

        res
            .status(200)
            .json(`Post ${post.title} has been updated`)
    })

    // delete post

    .delete('/:id', async (req: RequestWithPost, res: Response) => {
        const post = await PostRecord.getPostById(req.params.id)

        if (!post) {
            throw new ValidationError('There is NO post!');
        }
        await post.deletePost(req.id)
        res
            .status(200)
            .json(`${req.title} has been deleted.`)
    })
