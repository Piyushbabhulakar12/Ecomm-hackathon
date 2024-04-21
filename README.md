## E-Commerce Application with Authentication, Product, and Category Management

This project is an e-commerce application that allows users to authenticate, add products, and manage categories. The passwords are stored using MD5 encryption for enhanced security.

### Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
    - [Node.js Backend](#nodejs-backend)
    - [React.js Frontend](#reactjs-frontend)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

### Overview

The e-commerce application provides the following functionalities:

- **Authentication**: Users can sign up, log in, and log out securely. Passwords are stored using MD5 encryption for enhanced security.
- **Product Management**: Authenticated users can add products to the store, providing details such as product name, category, price, and image.
- **Category Management**: Users can manage product categories, including adding, updating, and deleting categories.

### Technologies Used

The project utilizes the following technologies:

- **Node.js**: Backend server environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and product information.
- **React.js**: Frontend library for building user interfaces.
- **MD5 Encryption**: Used to hash and encrypt passwords for user authentication.

### Setup Instructions

#### Node.js Backend

1. **Clone the repository**: `git clone <repository-url>`
2. **Navigate to the backend directory**: `cd backend`
3. **Install dependencies**: `npm install`
4. **Set up environment variables** (e.g., MongoDB connection string, JWT secret key).
5. **Start the server**: `npm start`

#### React.js Frontend

1. **Navigate to the frontend directory**: `cd frontend`
2. **Install dependencies**: `npm install`
3. **Start the development server**: `npm start`

### Usage

- **Authentication**:
    - Sign up for a new account with a username and password.
    - Log in with your credentials to access the application.
    - Log out when done.

- **Product Management**:
    - Once logged in, navigate to the product management section.
    - Add new products by providing details such as name, category, price, and image.
    - Update or delete existing products as needed.

- **Category Management**:
    - Manage product categories by adding, updating, or deleting categories.

### Contributing

Contributions to this project are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a new Pull Request.

### License

This project is licensed under the MIT License.
