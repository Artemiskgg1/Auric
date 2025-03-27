# 🌍 AURIC

A **Next.js** application that provides **live earthquake updates** and **future predictions** using **Google Maps API, USGS data, and Google Vertex AI**. The platform also includes **news updates, user authentication, and inventory management**.

## 🚀 Features

- **🌎 Live Updates** → Fetch real-time earthquake data from **Google Maps API & USGS**.
- **🔮 Future Predictions** → Use **Google Vertex AI** for forecasting future earthquake events.
- **📰 News Updates** → Fetch latest disaster news using **News API**.
- **🔐 Authentication** → User management via **Clerk**.
- **📦 Inventory Management** → Store & manage data using **Neon Console (PostgreSQL)**.
- **🎨 UI Frameworks** → Built with **Aceternity UI & ShadCN UI**.

---

## 📥 Installation

### 1. Clone the Repository

```sh
git clone https://github.com/Artemiskgg1/Auric.git
cd Auric
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_GOOGLE_API_KEY =your_api_key
GOOGLE_APPLICATION_CREDENTIALS=your_api_key
DATABASE_URL=your_neon_db_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key

```

### Run the Development Server

```sh
npm run dev
```

Open http://localhost:3000 in your browser.

<div align="center">
Made with ❤️ by JustTheTwoOfUs
</div>
