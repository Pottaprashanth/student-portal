# Student Portal

A full-stack web application developed using **React, Spring Boot, and MySQL** to manage student information. The application allows users to perform CRUD (Create, Read, Update, Delete) operations through a React user interface connected to REST APIs.

## 🚀 Technologies Used

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

**Backend**
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- REST APIs

**Database**
- MySQL

**Tools**
- Visual Studio Code
- Eclipse IDE
- Postman
- Git and GitHub

## ✨ Features

- Add new student records.
- View student details.
- Retrieve all students.
- Update existing student information.
- Delete student records.
- Store and manage student data using MySQL.
- Connect the React frontend to the Spring Boot backend using REST APIs.

## 🏗️ Project Structure

```text
Student-portal/
├── backend/
│   └── src/
│       └── main/
│           ├── java/
│           └── resources/
│               └── application.properties
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── index.html
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the application:

- Java JDK
- Node.js and npm
- MySQL Server
- Eclipse IDE or another Java IDE
- Visual Studio Code

## 🔧 Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Pottaprashanth/student-portal.git
cd student-portal
```

### 2. Configure MySQL

Create the database in MySQL:

```sql
CREATE DATABASE studentportal;
```

Configure your database URL, username, and password in the backend's `application.properties` file. Use environment variables for credentials rather than committing real passwords to GitHub.

### 3. Run the Spring Boot Backend

Open the `backend` folder in Eclipse or your preferred Java IDE.

Make sure the database configuration is correct, then run the main Spring Boot application class.

The backend will start on the configured port.

### 4. Run the React Frontend

Open a terminal in the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal, usually `http://localhost:5173`.

## 🔗 API Operations

The following operations reflect the endpoints used in this project. Confirm the controller mappings if your code differs.

| Operation | Endpoint |
|---|---|
| Get all students | `GET /student/getall` |
| Get a student by ID | `GET /student/getstudent/{id}` |
| Add a student | `POST /student/insert` |
| Update a student | `PUT /student/update/{id}` |
| Delete a student | `DELETE /student/delete/{id}` |

## 🔄 Application Workflow

1. The user performs an operation in the React interface.
2. React sends an HTTP request to the Spring Boot REST API.
3. The backend processes the request through its application layers.
4. Spring Data JPA interacts with the MySQL database.
5. The backend returns a response to React.
6. The frontend displays the updated student information.

## 🎯 Learning Outcomes

- Developed REST APIs using Spring Boot.
- Implemented CRUD operations using Spring Data JPA.
- Integrated a React frontend with a Java backend.
- Connected an application to a MySQL database.
- Practiced full-stack development and API testing.

## 👨‍💻 Developer

**Prashanth Potta**

GitHub: [Pottaprashanth](https://github.com/Pottaprashanth)

---

*This project was developed for learning and practicing full-stack web application development.*
