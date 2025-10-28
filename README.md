# VibeCommerce

**VibeCommerce** is a modern e-commerce web application built using the **MERN Stack (MongoDB, Express, React, Node.js)** with **Vite + Tailwind CSS** for a fast and responsive frontend.  
It integrates with the **Fake Store API** for fetching products and supports a persistent shopping cart stored in **MongoDB**.


## 🌐 Live Demo

- **Frontend (React + Vite + Tailwind):** [https://vibecommerce-3d8053cki-jatinnvaityy.vercel.app](https://vibecommerce-3d8053cki-jatinnvaityy.vercel.app)  
- **Backend (Node.js + Express + MongoDB):** [https://vibecommerce.onrender.com](https://vibecommerce.onrender.com)


## 🚀 Tech Stack

**Frontend**  React (Vite) + TailwindCSS + Axios + React Router + React Icons + React Toastify 
**Backend**  Node.js + Express.js + Mongoose 
**Database** MongoDB (Atlas / Local) 
**API**  Fake Store API (`https://fakestoreapi.com/products`) 
**Deployment**  Vercel (Frontend), Render (Backend) 



### 🛍️ Frontend
- Product listing page with data fetched from **Fake Store API**  
- Add to Cart functionality  
- View and manage items in Cart  
- Increment/Decrement quantity directly from cart  
- Checkout form with name and email input  
- Success receipt display after checkout  
- Fully responsive navbar with hamburger menu  
- Toast notifications for actions  

### ⚙️ Backend
- RESTful API with Express  
- MongoDB persistence for Cart and Products  
- Integrated with Fake Store API for dynamic product data  
- Checkout endpoint returns order receipt  
- Error handling and clean JSON responses  

## ⚡️ Environment Setup

### 1️⃣ Backend (`/backend`)

Install dependencies:

npm install express mongoose dotenv cors axios

npm install --save-dev nodemon

Create .env file:

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/vibecommerce

Run server:

npm run dev

## 2️⃣ Frontend (/frontend)

Install dependencies:

npm install react-router-dom axios react-icons react-toastify

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

Run frontend: npm run dev

## 🧩 API Endpoints

GET	/api/products	Fetch all products (from Fake Store API)

GET	/api/cart	Retrieve cart items

POST	/api/cart	Add an item to cart

PATCH	/api/cart/:id	Update cart quantity

DELETE	/api/cart/:id	Remove an item from cart

POST	/api/checkout	Place order and generate receipt
