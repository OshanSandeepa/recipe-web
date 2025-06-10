import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import User from '../models/User';
import { CustomError } from '../middleware/errorHandler';
import { auth } from '../middleware/auth';

const router = express.Router();

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
      };
    }
  }
}

// Get all recipes
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Get recipe by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Add recipe to favorites
router.post(
  '/favorites/:id',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new CustomError('User not authenticated', 401);
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      const id = req.params.id;
      const favorites = user.favorites || [];
      
      console.log("Favorites before update:", favorites);

      if (!favorites.includes(id)) {
        favorites.push(id);
        await user.update({ favorites });
        console.log("Favorites after update (if pushed):");
      }

      res.json({ message: 'Recipe added to favorites' });
    } catch (error) {
      next(error);
    }
  }
);

// Remove recipe from favorites
router.delete(
  '/favorites/:id',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new CustomError('User not authenticated', 401);
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      const id = req.params.id;
      const favorites = user.favorites || [];
      
      const updatedFavorites = favorites.filter(
        (recipeId: string) => recipeId !== id
      );
      
      await user.update({ favorites: updatedFavorites });

      res.json({ message: 'Recipe removed from favorites' });
    } catch (error) {
      next(error);
    }
  }
);

// Get user's favorite recipes
router.get(
  '/favorites',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new CustomError('User not authenticated', 401);
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      const favorites = user.favorites || [];
      const favoriteRecipes = await Promise.all(
        favorites.map(async (id: string) => {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          return response.data.meals?.[0];
        })
      );

      res.json(favoriteRecipes.filter(Boolean));
    } catch (error) {
      next(error);
    }
  }
);

export default router; 