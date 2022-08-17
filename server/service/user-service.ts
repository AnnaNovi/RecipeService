import { IUser, UserModel } from '../models/user-model';
import { TokenService } from './token-service';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { UserDto } from '../dtos/user-dto';
import { ApiError } from '../exeptions/api-error';

export class UserService {
  public static async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `User with such email as ${email} already exists.`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  public static async login(email: string, password: string) {
    const user: IUser | null = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(
        `User with such email as ${email} doesn't exist.`
      );
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw ApiError.BadRequest(`Wrong password`);
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  public static async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  public static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    //@ts-expect-error
    const user: IUser = await UserModel.findById(tokenFromDb.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  public static async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}
