
# Contact List Manager

A web application built using **React JS** (frontend) and **Ruby on Rails** (backend). 
This project enables users to manage their contacts, including adding, updating, and deleting contacts.

---

## **Project Structure**

- **Frontend (React JS)**: Client-side interface for managing the contact list.
- **Backend (Ruby on Rails)**: API server providing CRUD operations.

---

## **Setup Instructions**

### **1. Clone the Repository**

1. Open your terminal.
2. Run the following command to clone the repository:
   
   git clone <repository-url>
   cd contact-list-manager
   

---

### **2. Frontend Setup (React JS)**

1.
1. Create a React app:
   
   npx create-react-app 
   
2. Navigate to the `client` folder:
   
   cd client

3. Install dependencies:
   
   npm install
  
4. Run the React app:
  
   npm start
 
   - The React app will run by default localhost.

---

### **3. Backend Setup (Ruby on Rails)**



1. Create a new Rails API application:
   
   rails new . --api --database=postgresql
   
2. Navigate to the `server` folder:
  
   cd ../server
 
3. Install gems:
  
   bundle install
  
4. Create the database:
  
   rails db:create
 
5. Run migrations:
  
   rails db:migrate
  
6. Start the Rails server:
 
   rails s

   - The Rails API will run by default localhost.

---

### **4. Run the Full Application**

1. **Start the backend (Rails server):**
  
   cd server
   rails s
   
2. **Start the frontend (React app):**

   cd ../client
   npm start

3. Open your browser and navigate to your localhost to see the app in action.

---

### Design and Implementation Details

---
Approach Overview: The approach was to create a clear separation between the frontend and backend, enabling modular development and easier maintenance. By designing the homepage first, the main interface for interacting with contacts was prioritized.

Developed the React frontend with a component-based architecture to keep code reusable and organized.

Implemented a Rails API backend to handle data storage and CRUD operations, ensuring robust data persistence.

Added custom CSS styling to enhance the UI, focusing on responsive design.
## **Design Decisions and Trade-offs**

- **React with Rails API**: Chosen to separate frontend and backend for scalability and maintainability.
- **Database**: PostgreSQL was selected for its robustness and support for relational data.
- **Trade-offs**: The app focuses on core CRUD operations; additional features like "search". 

---

## **Key Features**

- Add new contacts with name and email.
- Update existing contacts.
- Delete contacts with a confirmation prompt.
- Search contacts by name or email.
- Responsive design with smooth animations.

---

## **License**

This project is licensed under the MIT License.


