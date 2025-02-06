# Money Transfer Application

This is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The application enables users to transfer money, view transaction history, fund their wallets, and track commissions. It includes functionality for both individual and group transactions with real-time updates.

## Features

### Backend Features:
- **User Management**: Sign up, login, and manage user accounts with different roles (User/Admin).
- **Transaction Management**: Users can deposit, withdraw, and transfer money between wallets.
- **Transaction Approval**: Admin can approve or reject transactions.
- **Commission Tracking**: Commission is calculated and tracked based on transactions (international vs national).
- **Internationalization**: The backend supports multiple languages (English, Hindi, Spanish, and French).


### Frontend Features:
- **User Interface**: The React app is responsive and provides users with an intuitive way to interact with their wallets, transactions, and commissions.
- **Transaction Management**: Users can view transaction details and initiate transfers.
- **Transaction Approval**: Admin can approve or reject transactions.
- **Wallet**: Users can check their wallet balance, make withdrawals, and see their transaction history.
- **Language Switcher**: The frontend supports dynamic language switching.

---
### Commisons on Transaction and Withdraws
- ** International**: 10
- ** Local **: 5

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [API Endpoints](#api-endpoints)
6. [ER Diagram](#er-diagram)
7. [Contributors](#contributors)

---

## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database to store users, transactions, and commissions.
- **JWT**: For authentication (JSON Web Tokens).
- **bcrypt**: For password hashing and security.
- **Mongoose**: MongoDB ODM to define schemas and interact with the database.

### Frontend:
- **React.js**: JavaScript library for building the UI components.
- **Material UI**: Component library for React that provides a set of high-quality UI elements.
- **Redux**: State management tool to handle the application state efficiently.
- **React-i18next**: Internationalization library for handling multiple languages.
- **RTK**: For making API calls.
- **React Toastify**: To show notifications and alerts for success and error events.

---

## Installation

### Clone the repository
``bash
git clone https://github.com/your-username/FULL_STACK_2.git
cd money-transfer-app


### Key Sections in the README:

1. **Technologies Used**: Lists all the tools and libraries used for both backend and frontend.
2. **Installation**: Step-by-step instructions for setting up the backend and frontend locally.
3. **API Endpoints**: Defines all the available API routes for user, transaction, approval, and commission management.
4. **ER Diagram**: Includes the PlantUML ER diagram to visualize the schema relationships.
5. **Contributors**: Space to acknowledge the people who contributed to the project.
6. **License**: Licensing information.

Feel free to customize this template further as needed! Let me know if you need additional adjustments.

