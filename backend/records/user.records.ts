import { pool } from '../utils/db';
import { ValidationError } from '../utils/error';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { UserEntity } from '../types/user';

type UserRecordResult = [UserRecord[], FieldPacket[]];

export class UserRecord implements UserEntity {
    id?: string;
    userName: string;
    email: string;
    password: string;

    constructor(obj: UserEntity) {  //było UserRecord, ma być entity, UserRecord ma w sobie  metody, i wtedy on krzyczy, że ich nie podałeś...
        // a do obiektu chcesz podać tylko pewne zmienne.

        if (!obj.userName || obj.userName.length < 3 || obj.userName.length > 55) {
            throw new ValidationError(
                'Your name has to be between 3 - 55 characters'
            );
        }
        if (!obj.email || typeof obj.email !== 'string' || obj.email.indexOf('@') === -1) {
            throw new ValidationError('Invalid E-mail')
        }
        this.id = obj.id;
        this.userName = obj.userName;
        this.email = obj.email;
        this.password = obj.password;
    }


// get user by email

    static async getUserByEmail(email: string) {
        const [results] = (await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
                email,
            }
        )) as UserRecordResult;
        return results.length === 0 ? null : new UserRecord(results[0]);
    }
// add - create user

    async addUserToDatabase(): Promise<string>  {
        if (!this.id) {
            this.id = uuid();

            await pool.execute('INSERT INTO `users` VALUES(:id, :userName, :email, :password)',
                {
                    id: this.id,
                    userName: this.userName,
                    email: this.email,
                    password: this.password,
                }
            );
            return this.id;
        }
    }

    static async getUserById(id: string) {
        const [results] = (await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
                id,
            }
        )) as UserRecordResult;
        return results.length === 0 ? null : new UserRecord(results[0]);
    }


    //update user
    // async update(): Promise<void> {
    // }
}