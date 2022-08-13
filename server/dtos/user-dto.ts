import { Schema } from 'mongoose';
import { IUser } from '../models/user-model';

export class UserDto {
  email: string;
  id: Schema.Types.ObjectId;
  isActivated: boolean;

  constructor(model: IUser) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
