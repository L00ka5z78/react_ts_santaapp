import { pool } from '../utils/db';
import { ValidationError } from '../utils/error/error';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { ChildEntity } from '../types';

type ChildRecordResult = [ChildRecord[], FieldPacket[]];

export class ChildRecord implements ChildEntity {
  public id?: string;
  public name: string;
  public giftId: string;
  public desc: string;

  constructor(obj: ChildEntity) {
    if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
      throw new ValidationError(' Name has to be between 3 - 25 characters');
    }

    this.id = obj.id;
    this.name = obj.name;
    this.giftId = obj.giftId;
    this.desc = obj.desc;
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute(
      'INSERT INTO `children` (`id`, `name`, `desc`) VALUES(:id, :name, :desc)',
      {
        id: this.id,
        name: this.name,
        desc: this.desc,
      }
    );
    return this.id;
  }

  static async listAll(): Promise<ChildRecord[]> {
    const [results] = (await pool.execute(
      'SELECT * from `children` ORDER BY `name` ASC'
    )) as ChildRecordResult;
    return results.map((obj) => new ChildRecord(obj));
  }

  static async getOne(id: string): Promise<ChildRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * from `children` WHERE `id` = :id',
      {
        id,
      }
    )) as ChildRecordResult;
    return results.length === 0 ? null : new ChildRecord(results[0]);
  }

  async update(): Promise<void> {
    await pool.execute(
      'UPDATE `children` SET `name` = :name, `giftId` = :giftId, `desc` = :desc WHERE `id` = :id',
      {
        id: this.id,
        name: this.name,
        giftId: this.giftId,
        desc: this.desc,
      }
    );
  }

  static async isNameTaken(name: string): Promise<boolean> {
    const [results] = (await pool.execute(
      'SELECT * FROM `children` WHERE `name` = :name',
      {
        name,
      }
    )) as ChildRecordResult;
    return results.length > 0;
  }

  async delete(): Promise<void> {
    await pool.execute('DELETE FROM `children` WHERE `id` = :id', {
      id: this.id,
    });
  }
}
