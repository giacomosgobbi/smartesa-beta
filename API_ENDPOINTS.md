# Smartesa Beta - API Endpoints

## Backend API Endpoints

### 1. GET /api/supermarkets
Returns list of available supermarkets
Response:
```json
{
  "supermarkets": ["Lidl", "Esselunga", "Carrefour", "MD", "Iperal", "Coop"]
}
```

### 2. GET /api/products
Returns all products with prices per supermarket
Response:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Milk",
      "unit": "1L",
      "category": "dairy",
      "prices": {
        "Lidl": 1.19,
        "Esselunga": 1.29,
        "Carrefour": 1.35,
        "MD": 1.15,
        "Iperal": 1.25,
        "Coop": 1.30
      }
    }
  ]
}
```

### 3. POST /api/compare
Calculates cheapest supermarket for given grocery list
Request:
```json
{
  "items": ["Milk", "Pasta", "Apples"]
}
```
Response:
```json
{
  "comparison": [
    {
      "supermarket": "Lidl",
      "total": 5.47,
      "items": [...]
    },
    {
      "supermarket": "Esselunga",
      "total": 6.12,
      "items": [...]
    }
  ],
  "cheapest": "Lidl"
}
```

### 4. GET /api/profile (mock)
Returns mock user profile
Response:
```json
{
  "name": "John Doe",
  "location": "Milan",
  "preferences": ["organic", "local"],
  "intolerances": ["lactose"],
  "budget": "medium"
}
```

### 5. POST /api/profile (mock)
Saves user profile (in-memory only for beta)
Request:
```json
{
  "name": "John Doe",
  "location": "Milan",
  "preferences": ["organic"],
  "intolerances": ["gluten"],
  "budget": "low"
}
```
