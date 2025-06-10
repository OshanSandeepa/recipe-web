import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

const Dashboard = () => {
  const [recentFavorites, setRecentFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    fetchRecentFavorites();
  }, [token]);

  const fetchRecentFavorites = async () => {
    if (!token) {
      setIsLoading(false);
      setRecentFavorites([]);
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/api/recipes/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecentFavorites(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching recent favorites:', error);
      toast.error('Failed to load recent favorites');
      setRecentFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-lg text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-500 font-serif">Welcome, {user?.username}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg shadow-inner p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/"
                className="block w-full bg-pink-500 text-white text-center py-3 px-4 rounded-lg font-semibold text-lg hover:bg-pink-600 transition duration-300 shadow"
              >
                Browse Recipes
              </Link>
              <Link
                to="/favorites"
                className="block w-full bg-blue-500 text-white text-center py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-300 shadow"
              >
                View All Favorites
              </Link>
            </div>
          </div>

          {/* Recent Favorites */}
          <div className="bg-gray-50 rounded-lg shadow-inner p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">Recent Favorites</h2>
            {recentFavorites.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                You haven't added any recipes to your favorites yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentFavorites.map((recipe) => (
                  <Link
                    key={recipe.idMeal}
                    to={`/recipe/${recipe.idMeal}`}
                    className="flex items-center space-x-4 p-3 hover:bg-white rounded-lg transition duration-200 shadow-sm"
                  >
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-lg text-gray-800">{recipe.strMeal}</h3>
                      <p className="text-sm text-gray-500">{recipe.strCategory}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 