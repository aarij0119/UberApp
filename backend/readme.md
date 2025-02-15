# UberApp

## Project Structure

### Backend

The backend of this project is structured as follows:

- **controllers**
  - `captaincontroller.js`: Contains the controller logic for captain-related operations.
  - `usercontroller.js`: Contains the controller logic for user-related operations.

- **middlewares**
  - `iscaptainloggedin.js`: Middleware to check if a captain is logged in.
  - `isuserloggedin.js`: Middleware to check if a user is logged in.

- **models**
  - `blaclistedModelToken.js`: Model for blacklisted tokens.
  - `captainModel.js`: Model for captain data.
  - `usermodel.js`: Model for user data.

- **routes**
  - `captainroute.js`: Routes for captain-related operations.
  - `userroute.js`: Routes for user-related operations.

- **db**
  - `db.js`: Database connection setup.

- **app.js**: Main entry point for the backend application.

### Configuration Files

- **backend**
  - `.gitignore`: Specifies files and directories to be ignored by Git.
  - `package.json`: Contains metadata about the backend project and its dependencies.

## Getting Started

### Backend

1. Install dependencies:
   ```bash
   npm install

2. Start the backend server:
npm run dev
API Endpoints
   
User Register Route // routes
POST /users/register: Register a new user.

Request Body
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
POST /users/login: <vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> a</vscode_annotation>Login user.

{
  "email": "john.doe@example.com",
  "password": "password123"
}
GET /users/logout: Logout a user.

No Request Body
GET /users/isloggedin: Check if a user is logged in.

No Request Body
Captain Routes
POST /captains/register: Register a new captain.

{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red"
  },
  "plate": "ABC123",
  "capacity": 4,
  "vehicleType": "Sedan"
}
POST /captains/login: Login a captain.

Request Body:
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
GET /captains/logout: Logout a captain.

No Request Body
Environment Variables
Create a .env file in the backend directory with the following 

variables:USER_SECRET_KEY=your_user_secret_key
CAPTAIN_SECRET_KEY=your_captain_secret_key