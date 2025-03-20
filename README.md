### README
# First-Step Application
This project is a simple server-side application utilizing **Node.js**, **Express**, **Sequelize**, and a **PostgreSQL** database. The application includes capabilities like validating requests, managing user balances, and running stress tests for performance evaluation.
## Features
- Implements **Sequelize ORM** for database interactions.
- **PostgreSQL** support with database initialization and migration handling.
- **Express.js** for routing and middleware management.
- Input validation using **Joi**.
- Rate-limiting support for enhanced security using **express-rate-limit**.
- Built-in stress testing capability using **autocannon**.

## Prerequisites
To run the project locally, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.x or above recommended)
- [PostgreSQL](https://www.postgresql.org/)
## Installation
1. Clone the repository:
   git clone https://github.com/your-repo/first-step.git
   cd first-step
   npm install
2. 1. Create a `.env` file at the root directory and add the following:
   # Database configuration
   DB_NAME=<your-database-name>
   DB_USER=<your-database-user>
   DB_PASSWORD=<your-database-password>
   DB_HOST=localhost
   DB_PORT=5432
   DB_DIALECT=postgres
   
## Database Configuration & Initialization
The app automatically initializes the database on the first run, checking for its existence and creating it if necessary. Migrations are applied to create or update database tables.
1. To customize migration logic, edit the migrations available in:
      ./public/src/migrations/

## Stress Testing
A stress testing script is included to benchmark the performance of the `updateBalance` API.
- To run the stress test:
  node stressTest.js
  
## Project Structure
.
├── .env                 # Environment configuration
├── app.js               # Express app configuration
├── stressTest.js        # Stress testing script
├── public
│   ├── src
│   │   ├── configs      # Configuration files (Sequelize, environment)
│   │   ├── middlewares  # Custom Express middleware
│   │   ├── migrations   # Database migration scripts
│   │   ├── models       # Sequelize models
│   │   ├── routes       # Routes definitions
│   │   └── services     # Business/service layer
│   └── umzug.js         # Umzug migration manager
└── package.json         # Project metadata and dependencies

## Known Issues
- Ensure the database configuration in `.env` matches your PostgreSQL setup to avoid connection errors.
- Stress tests may overload the database if run continuously.

