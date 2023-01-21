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

    static async getUserByTitle(title: string) {
        const [results] = (await pool.execute("SELECT * FROM `users` WHERE `title` = :title", {
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

    static async getPostById(id: string) {      // ok
        const [results] = (await pool.execute("SELECT * FROM `posts` WHERE `id` = :id", {
                id,
            }
        )) as PostRecordResults;
        return results.length === 0 ? null : new PostRecord(results[0]);
    }


    //update post
    // async update(): Promise<void> {
    // }
}