🏡 WanderLust
Find Your Next Stay — WanderLust makes hosting and traveling effortless.
<p align="center"> <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" width="120" height="120" alt="WanderLust Logo"/> </p>

A full-stack travel and stay booking web application inspired by Airbnb — where users can explore destinations, host their places, and share experiences.

🌍 Live Demo

🔗 WanderLust on Render

🏗️ Tech Stack
Category	Technology
Frontend	HTML, CSS, Bootstrap 5, EJS
Backend	Node.js, Express.js
Database	MongoDB Atlas
Architecture	MVC (Model–View–Controller)
Authentication	Passport.js (Local Strategy)
Image Uploads	Multer + Cloudinary
Validation	Joi
Session & Flash	Express-Session, Connect-Flash, Connect-Mongo
Deployment	Render
✨ Features

✅ User Authentication — Secure signup/login using Passport.js
✅ Add & Manage Listings — Create, edit, or delete your own listings
✅ Explore by Category — Filter properties (Sea Side, Villa, Nature, etc.)
✅ Search Functionality — Search by name, country, or location
✅ Reviews System — Users can leave ratings and feedback
✅ Flash Messages — Instant success/error notifications
✅ Responsive Design — Works smoothly on all screen sizes
✅ Error Handling — Custom 404 and validation pages
✅ Session Persistence — Stored securely with Mongo

⚙️ Installation & Setup

To run WanderLust locally:

# 1️⃣ Clone the repository
git clone https://github.com/Khanasjad27/WanderLust.git

# 2️⃣ Navigate to the project directory
cd WanderLust

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create a .env file in the root directory
# Add the following:
ATLAS_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret

# 5️⃣ Run the app
node app.js


Then open http://localhost:8080
 in your browser 🌐

🧾 Folder Structure
WanderLust/
│
├── model/              # Mongoose models (User, Listing, Review)
├── routes/             # Express route handlers
├── Controllers/        # Controller logic (MVC pattern)
├── views/              # EJS templates (Frontend)
│   ├── listings/
│   ├── users/
│   ├── partials/
│   └── layouts/
├── public/             # Static assets (CSS, JS, Images)
├── utils/              # Helper utilities
├── schema.js           # Joi validation schema
├── app.js              # Main application file
├── .env                # Environment variables
├── package.json
└── README.md

🧑‍💻 Author

👋 Khan Asjad Shamshad Ahmed
💻 MERN Stack / Full Stack Developer
📫 GitHub: Khanasjad27

🌐 Building creative, efficient, and scalable web experiences.

💬 Acknowledgements

Bootstrap 5

Cloudinary

Render

MongoDB Atlas

Passport.js

📜 License

This project is licensed under the MIT License — free to use and modify with attribution.
