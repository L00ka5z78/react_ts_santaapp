import { Router, Request, Response } from 'express';

import { GiftRecord } from '../records/gift.record';
import { CreateGiftReq, GetSingleGiftRes, GiftEntity } from '../types';
import { ValidationError } from '../utils/error/error';

export const giftRouter = Router();

giftRouter
  .get('/', async (req: Request, res: Response): Promise<void> => {
    const giftList = await GiftRecord.listAll();
    // return pure data instead of views like in handebars.
    res.json({
      giftList,
    });
  })

  .get('/:giftId', async (req: Request, res: Response): Promise<void> => {
    const gift = await GiftRecord.getOne(req.params.giftId);
    const givenCount = await gift.countGivenGifts();
    // return pure data instead of views like in handebars.
    res.json({
      gift,
      givenCount,
    } as GetSingleGiftRes);
  })

  .delete('/:id', async (req, res) => {
    const gift = await GiftRecord.getOne(req.params.id);

    if (!gift) {
      throw new ValidationError('There is NO gift with given ID');
    }
    if ((await gift.countGivenGifts()) > 0) {
      throw new ValidationError('Cant remove given gift');
    }
    await gift.delete();
    res.end();
  })

  .post('/', async (req, res): Promise<void> => {
    // const newGift = new GiftRecord(req.body as CreateGiftReq);
    const newGift = new GiftRecord(req.body);
    await newGift.insert();
    res.json(newGift);
  });
