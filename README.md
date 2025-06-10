# Recipe Web Application
![image](https://github.com/user-attachments/assets/6dc2c90c-ea26-4d7e-ab07-ab52e013aa78)


A full-stack web application that allows users to explore, save, and manage their favorite recipes using TheMealDB API.

## Features

- User authentication (register/login)
- Browse recipes by categories
- View detailed recipe information
- Save favorite recipes
- Manage favorite recipes
- Responsive design
- Secure API endpoints

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- React Hot Toast for notifications

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- JWT for authentication
- Express Validator for input validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-web
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

4. Start the development servers:

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Recipes
- GET /api/recipes/categories - Get all recipe categories
- GET /api/recipes/category/:category - Get recipes by category
- GET /api/recipes/:id - Get recipe details
- GET /api/recipes/favorites - Get user's favorite recipes (protected)
- POST /api/recipes/favorites/:id - Add recipe to favorites (protected)
- DELETE /api/recipes/favorites/:id - Remove recipe from favorites (protected)

## Project Structure

```
recipe-web/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.tsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── index.ts
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 
