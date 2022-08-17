import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user-service';
import { validationResult } from 'express-validator';
import { ApiError } from '../exeptions/api-error';

export class UserController {
  public static async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Body request validate error', errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  public static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
  public static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  public static async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
