import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user-service';

export class UserController {
  public static async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
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
    } catch (error) {
      next(error);
    }
  }
  public static async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  public static async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      next(error);
    }
  }
  public static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  public static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['123', '456']);
    } catch (error) {
      next(error);
    }
  }
}
