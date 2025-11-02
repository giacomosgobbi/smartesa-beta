# Smartesa (Beta) - Supermarket Price Comparison App

A web application that compares supermarket prices and helps users save money by showing where their entire grocery list costs less. Built as a shopping compass for smarter grocery decisions.

## Features

### Core Features (Beta Version)

- **Supermarket Price Comparison**: Compare prices across 6 major Italian supermarkets (Lidl, Esselunga, Carrefour, MD, Iperal, Coop)
- **Grocery List Creation**: Add items with autocomplete suggestions
- **Smart Comparison**: See which supermarket offers the best total price for your entire list
- **User Profile**: Set preferences, dietary intolerances, and budget level
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Minimalist interface with intuitive navigation

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **shadcn/ui** for pre-built components
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **CORS** enabled for cross-origin requests
- **In-memory data storage** (mock data for beta)

### Data
- Mock JSON files simulating product database
- 15 products with prices across 6 supermarkets
- Includes per-kg pricing for produce, meat, and fish

## Project Structure

```
smartesa-beta/
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── package.json        # Backend dependencies
│   └── .env               # Backend configuration
├── frontend/
│   ├── src/
│   │   ├── App.tsx        # Main app with routing
│   │   ├── pages/
│   │   │   ├── HomePage.tsx      # Landing page
│   │   │   ├── ComparePage.tsx   # Price comparison page
│   │   │   └── ProfilePage.tsx   # User profile page
│   │   └── components/ui/  # shadcn/ui components
│   ├── package.json       # Frontend dependencies
│   └── .env              # Frontend configuration
├── data/
│   ├── products.json      # Mock product data with prices
│   └── supermarkets.json  # Supermarket information
├── API_ENDPOINTS.md       # API documentation
└── README.md             # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
```bash
cd smartesa-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Access the Application

Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### GET /api/supermarkets
Returns list of available supermarkets

### GET /api/products
Returns all products with prices per supermarket

### POST /api/compare
Calculates cheapest supermarket for given grocery list
- Request body: `{ "items": ["Milk", "Pasta", "Apples"] }`
- Returns comparison results sorted by total price

### GET /api/profile
Returns user profile (in-memory storage)

### POST /api/profile
Updates user profile (in-memory storage)
- Request body: `{ "name": "...", "location": "...", "preferences": [...], "intolerances": [...], "budget": "..." }`

See `API_ENDPOINTS.md` for detailed documentation.

## Usage

### 1. Home Page
- View app overview and features
- Click "Start Comparing Prices" to begin

### 2. Compare Prices
- Type product names in the input field
- Use autocomplete suggestions for quick selection
- Add multiple items to your grocery list
- Click "Compare Prices" to see results
- View which supermarket offers the best total price
- See individual item prices and percentage differences

### 3. Profile
- Set your name and location
- Select shopping preferences (organic, local, eco-friendly, etc.)
- Mark dietary intolerances (lactose, gluten, nuts, etc.)
- Choose your budget level (low, medium, high)
- Save your profile

## Beta Limitations

- **Mock Data**: Currently uses static mock data for demonstration
- **In-Memory Storage**: Profile data is lost when server restarts
- **Limited Products**: 15 products available in beta version
- **No Real-Time Prices**: Prices are static mock data

## Future Enhancements

- Real supermarket API integration
- Persistent database storage
- Smart recommendations based on events (birthdays, holidays)
- Green/sustainable product choices
- Real-time offers and promotions
- Shopping list history
- Price alerts and notifications
- Expanded product catalog

## Development

### Running Tests
```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd smartesa-frontend
npm test
```

### Building for Production
```bash
# Build frontend
cd smartesa-frontend
npm run build
```

The built files will be in the `dist` directory.

## Contributing

This is a beta version. Contributions and feedback are welcome!

## License

MIT License

## Author

Built by Paolo (easybnb22@gmail.com) with Devin AI
GitHub: @giacomosgobbi

## Acknowledgments

- shadcn/ui for beautiful UI components
- TailwindCSS for utility-first styling
- Lucide for icons
