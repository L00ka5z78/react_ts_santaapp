import { PostEntity } from './post.entity';

export type CreatePostReq = Omit<PostEntity, 'id'>;

export interface GetSinglePostRes {
    title: PostEntity;
    desc: string;
    img: string;
    date: Date;
    uid: string;
    cat: string;
}