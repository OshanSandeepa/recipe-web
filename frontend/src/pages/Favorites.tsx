import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';   // Solid heart for favorites

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchFavorites();
  }, [token]);

  const fetchFavorites = async () => {
    if (!token) {
      setIsLoading(false);
      setFavorites([]); // Ensure favorites are empty if no token
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/api/recipes/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Response data for favorites:", response.data);
      
      if (Array.isArray(response.data)) {
        setFavorites(response.data);
      } else {
        console.error("Favorites data is not an array:", response.data);
        setFavorites([]); // Set to empty array if not an array
        toast.error('Received unexpected data format for favorites.');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorite recipes');
      setFavorites([]); // Ensure favorites are cleared on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (recipeId: string) => {
    if (!token) return; // Prevent action if not authenticated
    try {
      await axios.delete(`http://localhost:5000/api/recipes/favorites/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(favorites.filter((recipe) => recipe.idMeal !== recipeId));
      toast.success('Recipe removed from favorites');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove recipe from favorites');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-lg text-gray-600">
        Loading favorite recipes...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">You haven't added any recipes to your favorites yet.</p>
          <Link
            to="/"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {favorites.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300 block"
            >
              <Link to={`/recipe/${recipe.idMeal}`}>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-40 object-cover"
                />
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">{recipe.strCategory || 'Category'}</span>
                  <HeartSolidIcon 
                    className="h-5 w-5 text-red-400 cursor-pointer"
                    onClick={() => handleRemoveFavorite(recipe.idMeal)} // Click to remove
                  />
                </div>
                <Link
                  to={`/recipe/${recipe.idMeal}`}
                  className="text-lg font-semibold text-gray-800 text-center hover:text-pink-500 block"
                >
                  {recipe.strMeal}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 