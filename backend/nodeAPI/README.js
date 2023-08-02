/*

# List all books 
GET
http://localhost:3000/api/store/books

# Get specific book
GET
http://localhost:3000/api/store/books/{{book-id}}

# List books by search name | category | price range
GET
http://localhost:3000/api/store/search?name=x&category=x&minPrice=x&maxPrice=x

---------------------

# Create new user
POST
http://localhost:3000/api/user/signup 
Body > {"name": "amr", "email": "x@g.com", "password": "zzzaaa"}

# Login user
POST
http://localhost:3000/api/user/login
Body > {"email": "x@g.com", "password": "zzzaaa"}

# Reset user password 
POST
http://localhost:3000/api/user/reset
Body > {"email": "x@g.com"}

# View user profile info
GET
http://localhost:3000/api/user/profile
Headers > Authorization: Bearer token

# List all user orders
GET
http://localhost:3000/api/user/orders
Headers > Authorization: Bearer token

# Add or Update shipping address
POST
http://localhost:3000/api/user/shipping
Headers > Authorization: Bearer token
Body > {"address": "test"}

# List user cart books
GET
http://localhost:3000/api/user/cart
Headers > Authorization: Bearer token

# Add book to user cart
POST
http://localhost:3000/api/user/cart/{{book-id}}
Headers > Authorization: Bearer token

# Remove book from user cart
DELETE
http://localhost:3000/api/user/cart/{{book-id}}
Headers > Authorization: Bearer token

# Create new order
POST 
http://localhost:3000/api/user/order
Headers > Authorization: Bearer token

---------------------

# Create new book
POST
http://localhost:3000/api/mange/books
Headers > Authorization: Bearer token
Body > {"name": "x", "costPrice": 15, "sellingPrice": 25, "category": "Fantasy",
    "description": "a", "imageURL": "https://picsum.photos/200", "quantity": 10}

# Update specific book 
PATCH
http://localhost:3000/api/mange/books/{{book-id}}
Headers > Authorization: Bearer token
Body > {name: 'y', sellingPrice: 30}

# Delete specific book 
DELETE
http://localhost:3000/api/mange/books/{{book-id}}
Headers > Authorization: Bearer token

# List all books
GET
http://localhost:3000/api/mange/allBooks
Headers > Authorization: Bearer token

# Get total number of users
GET
http://localhost:3000/api/mange/countUsers
Headers > Authorization: Bearer token

# Get total number of books
GET
http://localhost:3000/api/mange/countBooks
Headers > Authorization: Bearer token

# Get total number of orders
GET
http://localhost:3000/api/mange/countOrders
Headers > Authorization: Bearer token

# Get total profit
GET
http://localhost:3000/api/mange/totalProfit
Headers > Authorization: Bearer token

# List all orders |or| only from start-date to end-date
GET
http://localhost:3000/api/mange/allOrders
http://localhost:3000/api/mange/allOrders?startDate=2023-07-01&endDate=2023-07-15
Headers > Authorization: Bearer token

# List of all users
GET
http://localhost:3000/api/mange/allUsers
Headers > Authorization: Bearer token

# Change user type to sub-admin
PATCH
http://localhost:3000/api/mange/change/{{user-id}}
Headers > Authorization: Bearer token

---------------------

*/