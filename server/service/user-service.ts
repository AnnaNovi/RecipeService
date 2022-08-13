import { UserModel } from '../models/user-model';
import { MailService } from './mail-service';
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
      activationLink,
    });
    await MailService.sendActivationMain(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}
