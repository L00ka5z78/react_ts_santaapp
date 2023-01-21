import { pool } from '../utils/db';
import { ValidationError } from '../utils/error/error';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { PostEntity } from '../types';

type PostRecordResults = [PostRecord[], FieldPacket[]];

export class PostRecord implements PostEntity {
    id?: string;
    postName: string;
    // email: string;
    // password: string;

    constructor(obj: PostEntity) {  //było UserRecord, ma być entity, UserRecord ma w sobie  metody, i wtedy on krzyczy, że ich nie podałeś...
        // a do obiektu chcesz podać tylko pewne zmienne.

        if (!obj.postName || obj.postName.length < 3 || obj.postName.length > 55) {
            throw new ValidationError(
                'Your name has to be between 3 - 55 characters'
            );
        }

        this.id = obj.id;
        this.postName = obj.postName;
    }


// get user by email

    static async getUserByEmail(email: string) {
        const [results] = (await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
                email,
            }
        )) as PostRecordResults;
        return results.length === 0 ? null : new PostRecord(results[0]);
    }
// add - create user

    async addUserToDatabase(): Promise<string>  {
        if (!this.id) {
            this.id = uuid();

            await pool.execute('INSERT INTO `users` VALUES(:id, :userName, :email, :password)',
                {
                    id: this.id,
                    userName: this.userName,
                    // email: this.email,
                    // password: this.password,
                }
            );
            return this.id;
        }
    }

    static async getUserById(id: string) {


        const [results] = (await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
                id,
            }
        )) as PostRecordResults;
        return results.length === 0 ? null : new PostRecord(results[0]);
    }


    //update user
    // async update(): Promise<void> {
    // }
}