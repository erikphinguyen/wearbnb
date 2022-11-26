# wearbnb

wearbnb is a fullstack web application modeled after Airbnb.  Signed up users can create a listing of a brand and create comments.

Visit the live site here: https://wearbnb.onrender.com/

![image](https://user-images.githubusercontent.com/46208016/192426232-a64ffac3-e890-4ffa-bf3b-684da6065d5c.png)

## Technologies Used:
* **Languages:** Javascript, HTML/CSS
* **Backend:** Express
* **Frontend:** React, Redux
* **Database:** PostgreSQL
* **Hosting:** Render

## How to Start:
1. Clone this repository @ https://github.com/erikphinguyen/wearbnb
2. Install all dependencies in both backend and frontend via "npm install" in the terminal
3. Create your **.env** file in the backend folder; there is an **.env-example** in case you need help
4. Ensure PostgreSQL matches **.env** file
5. Enter the environment, and do migrations as well as seedings
   *Here is a chain of commands in case migrations and seedings go bad:
   * npx dotenv sequelize db:seed:undo:all
   * npx dotenv sequelize db:migrate:undo:all
   * npx dotenv sequelize db:migrate
   * npx dotenv sequelize db:seed:all
   * npx dotenv sequelize db:seed:undo
6. Run **npm start** in both the backend and frontend folder to start the app

## Links
* [Features List](https://github.com/erikphinguyen/wearbnb/wiki/Feature-List)
* [Database Schema](https://github.com/erikphinguyen/wearbnb/wiki/Database-Schema)
* [Wireframes and Front End Routes](https://github.com/erikphinguyen/wearbnb/wiki/Wireframes-and-Front-End-Routes)
* [API Routes](https://github.com/erikphinguyen/wearbnb/wiki/API-Routes)
* [User Stories](https://github.com/erikphinguyen/wearbnb/wiki/User-Stories)

## Features
# Brands
All users are able to view all brands, and can click each brand to view more details of each single brand.  If the user is signed in, then that user can create, edit, or delete their respective brands.

# Reviews
All users are able to view all reviews to a certain brand.  Signed in users can create, edit, or delete their respective review.

# Bookings
All users are able to view the prices of a specific brand, but only logged in users can book the brand and can view all bookings in their specific user profile.

# Search Bar
All users are able to search for any existing brand on the search bar in the middle of the navigation bar.

## Future Features to Implement
* Favorites
* Messaging
* AWS Upload
* Maps
