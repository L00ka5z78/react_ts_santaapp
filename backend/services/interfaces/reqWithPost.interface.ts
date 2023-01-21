import { Request } from 'express';
import {PostRecord} from "../../records/post.record";

interface RequestWithPost extends Request {
    title?: PostRecord;
}

export default RequestWithPost;