import { Router, Request, Response } from 'express';
import { ChildRecord } from '../records/child.record';
import { GiftRecord } from '../records/gift.record';
import { CreateChildReq, ListChildrenRes, SetGiftForChildReq } from '../types';
import { ValidationError } from '../utils/error';

export const childRouter = Router();

childRouter
  .get('/', async (req, res) => {
    const childrenList = await ChildRecord.listAll();
    const giftsList = await GiftRecord.listAll();
    // return pure data instead of views like in handebars.

    res.json({
      childrenList,
      giftsList,
    } as ListChildrenRes);
  })

  .post('/', async (req, res) => {
    const newChild = new ChildRecord(req.body as CreateChildReq);
    await newChild.insert();
    res.json(newChild);

    //error works in terminal, but adds child to the list. fix it
    //30.12 added name as unique key. didnt add duplicated name, shows undefined added to santas list
    // if (await ChildRecord.isNameTaken(req.body.name)) {
    //   throw new ValidationError(
    //     `Name ${req.body.name} is already taken. Choose a different one`
    //   );
    // }
  })

  .delete('/:id', async (req, res) => {
    const child = await ChildRecord.getOne(req.params.id);

    if (!child) {
      throw new ValidationError('There is NO child with given ID');
    }
    // if ((await gift.countGivenGifts()) > 0) {
    //   throw new ValidationError('Cant remove given gift');
    // }
    await child.delete();
    res.end();
  })

  .patch('/gift/:childId', async (req, res) => {
    // async (req: Request, res: Response): Promise<void> => {
    const {
      body,
    }: {
      body: SetGiftForChildReq;
    } = req;

    const child = await ChildRecord.getOne(req.params.childId);
    if (!child) {
      throw new ValidationError('Cant find child with given ID.');
    }
    const gift =
      body.giftId === '' ? null : await GiftRecord.getOne(body.giftId);

    if (gift) {
      if (gift.count <= (await gift.countGivenGifts())) {
        throw new ValidationError('To little of this gift.');
      }
    }

    child.giftId = gift?.id ?? null;
    await child.update();

    res.json(child);
  });
