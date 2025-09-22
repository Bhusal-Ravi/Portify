# Portify

![Portify Banner](./favicon_portlify.png) <!-- Replace with your actual banner image if available -->

## 🚀 Introduction

**Portify** is a modern, full-stack web application that lets anyone create, customize, and share a personal portfolio website—no coding required! Simply pick a unique username, fill out a form with your skills, experience, projects, and social links, and instantly get a beautiful, shareable portfolio at `portlify.com/your-username`.

---

## ✨ Features

- **Easy Portfolio Creation:** No coding needed—just fill out a form!
- **Unique Portfolio URL:** Your portfolio is available at `portlify.com/your-username`
- **Live Preview:** See changes as you build your portfolio.
- **Multiple Sections:** Add projects, skills (with icons), experience, social links, and a personal description.
- **Image Uploads:** Upload your profile picture and project images.
- **Custom Themes:** Choose a theme for your portfolio.
- **Authentication:** Secure login with Google OAuth.
- **Responsive Design:** Looks great on any device.
- **Contact Form:** Visitors can send you messages.
- **Modern UI:** Interactive, animated interface using React and Framer Motion.

---

## 🖼️ Demo

Check out the live demo: [https://www.portlify.me/ravi](https://www.portlify.me/ravi)

---

## 📦 Tech Stack

- **Frontend:** React, Framer Motion, React Hook Form
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Passport.js (Google OAuth)
- **File Uploads:** Multer
- **Styling:** TailwindCSS
- **Hosting:** FrontEnd:Vercel | Backend: Render

---

## 🌟 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running (local or Atlas)
- Google OAuth credentials (for authentication)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bhusal-Ravi/Portify.git
   cd Portify
   ```

2. **Install dependencies for frontend:**
   ```bash
   cd src
   npm install
   ```

3. **Install dependencies for backend:**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables:**
   - Create `.env` files in both `client` and `backend` folders.
   - Example variables:
      ```
      # backend/.env
      SECRET_KEY=your_secret_key_here
        MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/dbname?retryWrites=true&w=majority
        CLIENT_ID=your_google_client_id_here
        CLIENT_SECRET=your_google_client_secret_here
        CALLBACK_URL=http://localhost:5001/auth/google/callback
        CLIENT_URL=http://localhost:5173
        CLOUD_NAME=your_cloudinary_cloud_name
        API_KEY=your_cloudinary_api_key
        API_SECRET=your_cloudinary_api_secret
        PORT=5001
        MAIL_RECEIVER=your_email@example.com
        APP_PASSWORD=your_email_app_password
        ALLOWED_ORIGINS=http://localhost:5173
        NODE_ENV=production
      ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

6. **Start the frontend development server:**
   ```bash
   cd ../src
   npm start
   ```

7. **Visit the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Usage

1. **Sign In:** Authenticate using Google (or as configured).
2. **Pick a Username:** Your portfolio will be at `portlify.com/your-username`.
3. **Fill Out the Form:** Add your information—skills, experience, projects, social links, and images.
4. **Preview & Save:** See your portfolio live as you edit.
5. **Share Your Portfolio:** Send your unique link to employers, friends, or showcase online!

---

## 📁 Project Structure

```
Portify/
│
├── src/        # React frontend
├── backend/       # Express backend
├── README.md
└── ...            # Other files
```

---

## 🛠️ Contributing

Feel free to fork the repo, open issues, or submit pull requests! Contributions are welcome.

---

## 📄 License

This project is not yet licensed. Please add a license if you plan to share or use it commercially.

---

## 🙌 Credits

Built with ❤️ by [Bhusal-Ravi](https://github.com/Bhusal-Ravi)

---

## 📧 Contact
ravubh2003@gmail.com

Have questions or feedback? Reach out via the contact form on your Portify portfolio, or open an issue on GitHub!
