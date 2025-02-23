# NutriCek 🍎

![NutriCek Logo](/public/assets/nutricek.png)

NutriCek is an AI-powered web application designed to help consumers quickly assess the nutritional content of packaged food and beverages. By utilizing image recognition technology, NutriCek simplifies the process of understanding nutritional labels, promoting informed food choices, and encouraging healthier eating habits.

### Live Website

[NutriCek Live](https://nutricek.rey.mba/)

---

## Tech Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)

1. **Next.js** for server-side rendering and seamless user interface.
2. **Tailwind CSS** for modern and responsive styling.
3. **Auth.js** with Google & Discord OAuth for secure user authentication.
4. **PostgreSQL** for a scalable and reliable database.
5. **React Query (TanStack Query)** for efficient server-state management.
6. **Prisma ORM** for database management and queries.
7. **Cloudflare R2** for object storage and content delivery.

---

## Table of Contents

1. [Installation](#installation)
2. [Environment Setup](#environment-setup)
3. [Usage](#usage)
4. [Features](#features)
5. [Contributors](#contributors)

---

## Installation

### Prerequisites

- Node.js/Bun/pnpm installed on your machine.

### Steps

1. **Clone Repository:**

   ```bash
   git clone https://github.com/reynaldomarchell/nutricek.git
   ```

2. **Install Dependencies:**

   Use your preferred package manager (we recommend Bun):

   ```bash
   bun install
   ```

3. **Setup Database Using Prisma:**

   Apply database migrations using Prisma:

   ```bash
   bunx prisma db push
   ```

4. **Start Development Server:**

   Start the development server:

   ```bash
   bun dev
   ```

5. **Access Application:**

   Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## Environment Setup

Ensure you have a valid `.env` file with the following variables:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/nutricek"

NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

OPENAI_API_KEY=

R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_ACCOUNT_ID=
```

---

## Usage

1. **Login (/login):**  
   Access full features by logging in with your Google or Discord account.

2. **Home (/home):**  
   Quickly view food grading information and explore trending health articles or product recommendations.

3. **Search (/search):**  
   Search for specific products or find popular and trending articles.

4. **Scan (/scan):**  
   Snap a photo of a packaged product and instantly receive its nutritional grade (A-D) along with insights.

5. **Favorites (/favorite):**  
   Save and access frequently scanned products for convenience.

6. **Articles (/article):**  
   Explore a variety of content on lifestyle, nutrition, health, and more.

---

## Features

- **Instant Food Grading:** Quickly assess the nutritional value of packaged foods using AI-powered image recognition.
- **Personalized Recommendations:** View product suggestions and articles tailored to your preferences.
- **Save Favorites:** Bookmark frequently scanned products for easy access.
- **Educational Articles:** Discover engaging content on nutrition, health, and healthy living tips.
- **OAuth Integration:** Securely log in using Google or Discord accounts.
- **Localized Experience:** Content and grading tailored for Indonesian users.

---

## Contributors

<a href="https://github.com/reynaldomarchell/nutricek/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=reynaldomarchell/nutricek"/>
</a>
