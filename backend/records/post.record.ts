import {pool} from '../utils/db';
import {ValidationError} from '../utils/error/error';
import {v4 as uuid} from 'uuid';
import {FieldPacket} from 'mysql2';
import {PostEntity} from '../types';

type PostRecordResults = [PostRecord[], FieldPacket[]];

export class PostRecord implements PostEntity {
    id?: string;
    title: string;
    desc: string;
    img: string;
    date: Date;
    uid: string;
    cat: string;


    constructor(obj: PostEntity) {

        if (!obj.title) {
            throw new ValidationError('Title not found!');
        }

        this.id = obj.id;
        this.title = obj.title;
    }


// get post by title

    static async getPostByTitle(title: string) {
        const [results] = (await pool.execute("SELECT * FROM `posts` WHERE `title` = :title", {
               title,
            }
        )) as PostRecordResults;
        return results.length === 0 ? null : new PostRecord(results[0]);
    }

// add - create post

    async addPost(): Promise<string> {
        if (!this.id) {
            this.id = uuid();

            await pool.execute('INSERT INTO `posts` VALUES(:id, :title, :desc, :img, :date, :uid, :cat)',
                {
                    id: this.id,
                    title: this.title,
                    desc: this.desc,
                    img: this.img,
                    date: this.date,
                    uid: this.uid,
                    cat: this.cat,
                }
            );
            return this.id;
        }
    }

    // get post by id if needed

    static async getPostById(id: string) {      // ok
        const [results] = (await pool.execute("SELECT * FROM `posts` WHERE `id` = :id", {
                id,
            }
        )) as PostRecordResults;
        return results.length === 0 ? null : new PostRecord(results[0]);
    }

    // edit/ update post

    async updatePost(id: string) {
        await pool.execute("UPDATE `posts` SET `title` = :title,  `desc` = :desc, `img` = :img, `date` = :date, `cat` = :cat WHERE  `id` = :id", {
            id: this.id,
            title: this.title,
            desc: this.desc,
            img: this.img,
            date: this.date,
            uid: this.uid,      // <== uid === user id from users db not sure if i reach post with post id or user id
            cat: this.cat,
        });
    }

    //list all posts

    async getAllPosts() {
        const [results] = await pool.execute("SELECT * FROM `posts`");
        return results;
    }

    //delete post

    async deletePost(id: PostRecord) {
        await pool.execute("DELETE FROM `posts` WHERE `id` = :id", {
            id: this.id,
        })
    }
}