import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from './errorHandler';

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new CustomError('No authentication token provided', 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { userId: number };

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    next(new CustomError('Invalid authentication token', 401));
  }
}; 