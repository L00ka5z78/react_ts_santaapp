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
    password: string | number;

    constructor(obj: UserRecord) {
        if (!obj.userName || obj.userName.length < 3 || obj.userName.length > 55) {
            throw new ValidationError(
                'Your name has to be between 3 - 55 characters'
            );
        }

        this.id = obj.id;
        this.userName = obj.userName;
        this.email = obj.email;
        this.password = obj.password;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute(
            'INSERT INTO `users` VALUES(:id, :userName, :email, :password)',
            {
                id: this.id,
                userName: this.userName,
                email: this.email,
                password: this.password,
            }
        );
        return this.id;
    }
}   //added

    // static async listAll(): Promise<GiftRecord[]> {
    //     const [results] = (await pool.execute(
    //         'SELECT * FROM `gifts`'
    //     )) as GiftRecordResult;
    //     return results.map((obj) => new GiftRecord(obj));
    // }

    // static async getOne(id: string): Promise<GiftRecord | null> {
    //     const [results] = (await pool.execute(
    //         'SELECT * FROM `gifts` WHERE `id` = :id',
    //         {
    //             id,
    //         }
    //     )) as GiftRecordResult;
    //     return results.length === 0 ? null : new GiftRecord(results[0]);
    // }

    // async delete(): Promise<void> {
    //     await pool.execute('DELETE FROM `gifts` WHERE `id` = :id', {
    //         id: this.id,
    //     });
    // }

    // async countGivenGifts(): Promise<number> {
    //     const [[{ count }]] = (await pool.execute(
    //         'SELECT COUNT (*) AS `count` FROM `children` WHERE `giftId` = :id',
    //         {
    //             id: this.id,
    //         }
    //     )) as GiftRecordResult;
    //     return count;
    // }
// }
