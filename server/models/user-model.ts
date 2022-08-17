import { Schema, model } from 'mongoose';

export interface IUser {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<IUser>('User', UserSchema);
