# Order Tracking Mini-App

This project is a **full-stack order tracking application** built with:

- **Frontend:** Vue.js
- **Backend:** NestJS


## 🚀 Getting Started

### **1. Clone the Repository**

Run the following command in your terminal:


## 📌 Backend Setup (NestJS)

1. Move into the backend directory:

   ```bash
   cd order-tracking-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

4. Run the backend server:

   ```bash
   npm run start
   ```

   The backend will run at `http://localhost:3000` (by default).

---

## 🎨 Frontend Setup (Vue.js)

1. Move into the frontend directory:

   ```bash
   cd ../order-tracking-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the frontend app:

   ```bash
   npm run dev
   ```

   The frontend will run at `http://localhost:5173` (by default).

---

## 🛠️ Technologies Used

### Backend (NestJS):
- TypeScript
- NestJS
- PostgreSQL
- RESTful API

### Frontend (Vue.js):
- Vue 3
- Vite
- Vuetify CSS
- Axios (for API requests)

---

## ✅ Notes

Ensure that PostgreSQL is running before starting the backend.
TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '', //change username
      password: '', //change password
      database: 'order_tracking',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  Update the PostgreSQL username and password in src/app.module.ts
- If you face issues, check logs using `npm run start:debug` for backend.


![image](https://github.com/user-attachments/assets/3c36bd89-8b77-4172-9b2c-427cd710c138)

![image](https://github.com/user-attachments/assets/e39f16f5-972c-41f8-abb3-a893e6eaf721)

![image](https://github.com/user-attachments/assets/9f150963-c2d5-4284-8ee0-82677479208b)

![image](https://github.com/user-attachments/assets/e0a7fe03-2de8-48e5-a616-31e9703ecd6f)
