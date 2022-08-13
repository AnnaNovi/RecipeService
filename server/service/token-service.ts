import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import { TokenModel } from '../models/token-model';

export class TokenService {
  public static generateToken(payload: object): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || '',
      { expiresIn: '30d' }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  public static async saveToken(
    userId: Schema.Types.ObjectId,
    refreshToken: string
  ) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }
}
