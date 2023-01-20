import { Request } from 'express';
import {UserRecord} from '../records/user.records';

interface RequestWithUser extends Request {
    user?: UserRecord;
}

export default RequestWithUser;