import { GiftEntity } from '../gift';
import { ChildEntity } from './child.entity';

export interface ListChildrenRes {
  childrenList: ChildEntity[];
  giftsList: GiftEntity[];
}

export type CreateChildReq = Omit<ChildEntity, 'id'>;
export interface SetGiftForChildReq {
  giftId: string;
  desc: string;
}
