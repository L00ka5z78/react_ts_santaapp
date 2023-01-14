import { UserEntity } from './user.entity';

export type CreateUserReq = Omit<UserEntity, 'id'>;

export interface GetSingleUserRes {
    userName: UserEntity;
    email: string;
    password: string | number;
}