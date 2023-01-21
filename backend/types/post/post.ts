import { PostEntity } from './post.entity';

export type CreatePostReq = Omit<PostEntity, 'id'>;

export interface GetSinglePostRes {
    postName: PostEntity;
    // email: string;
    // password: string | number;
}