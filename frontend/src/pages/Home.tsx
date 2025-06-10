import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const categories = ['Pork', 'Beef', 'Chicken', 'Lamb', 'Pasta', 'Seafood', 'Vegetarian'];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Beef');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRecipesByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchRecipesByCategory = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition duration-300 
              ${selectedCategory === category
                ? 'bg-pink-500 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center text-lg text-gray-600">Loading recipes...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Link
                key={recipe.idMeal}
                to={`/recipe/${recipe.idMeal}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300 block"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{selectedCategory}</span>
                    <HeartOutlineIcon className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{recipe.strMeal}</h3>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">No recipes found for this category.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home; 