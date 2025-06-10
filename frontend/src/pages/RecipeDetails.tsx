import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
}

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      setRecipe(response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      toast.error('Failed to load recipe details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add recipes to favorites');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/recipes/favorites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Recipe added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast.error('Failed to add recipe to favorites');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading recipe details...
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Recipe not found
      </div>
    );
  }

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value], index) => ({
      ingredient: value,
      measure: recipe[`strMeasure${index + 1}` as keyof Recipe] || '',
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-96 object-cover"
          />
          {isAuthenticated && (
            <button
              onClick={handleAddToFavorites}
              className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add to Favorites
            </button>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {recipe.strCategory}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {recipe.strArea}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-gray-600">{item.measure}</span>
                  <span>{item.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails; 