
# Stream Vibe

Stream Vibe is a modern movie streaming web application that allows users to browse, search, and review movies. It features user authentication, personalized profiles, watchlists, favorites, and a sleek, responsive UI. The app integrates with The Movie Database (TMDb) API to provide up-to-date movie data, trailers, and cast information.

---

## 🔥 Live Preview

https://stream-vibe-lilac.vercel.app/

---

## Contributors

This project was developed collaboratively by:

- [Youssef Hataba](https://github.com/youssef-hataba) — Frontend Engineer  
- [Her Name](https://github.com/rawanayman229) — Frontend Engineer & Collaborator


## Features

- **Browse Movies:** Explore trending, top-rated, new releases, and must-watch movies.
- **Movie Categories:** Browse movies by genre with paginated results.
- **Movie Details:** View full details including cast, genres, ratings, and trailers.
- **Search:** Instantly search movies by title.
- **Authentication:** Register/login securely (session handled with cookies).
- **User Profiles:** Edit profiles, upload images.
- **Watchlist & Favorites:** Add/remove personal movie lists.
- **Movie Reviews:** Write and read reviews.
- **Actor Pages:** See actor profiles and their filmography.
- **Support Page:** Contact form and FAQ.
- **Responsive Design:** Fully responsive across devices.

---

## Technologies Used

- **Frameworks & Libraries:**
  - [Next.js 15](https://nextjs.org/)
  - [React](https://react.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Embla Carousel](https://www.embla-carousel.com/)
  - [Axios](https://axios-http.com/)

- **State Management:**
  - React Context API

- **API & Integrations:**
  - [TMDb API](https://www.themoviedb.org/documentation/api)
  - Custom backend API for auth, profiles, reviews

---

## 💻 Backend API

This frontend is powered by a Node.js + Express + MongoDB backend available here:  
👉 [Stream Vibe Backend Repository](https://github.com/youssef-hataba/Stream_Vibe_backend)

Make sure the backend is running locally or deployed and accessible via:  
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/youssef-hataba/Stream_Vibe
   cd Stream_Vibe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🐳 Run with Docker

Make sure your `.env` file is correctly configured.

### Build the Docker image:
```bash
docker build -t stream-vibe-frontend .
```

### Run the container:
```bash
docker run -p 3000:3000 --env-file .env stream-vibe-frontend
```

App will be available at `http://localhost:3000`

---

## 📹 UI Animation Demo

Watch the animation for login and register transitions:  
  https://stream-vibe-lilac.vercel.app/auth/login

---

## License

This project is for educational purposes.  
Movie data provided by [TMDb](https://www.themoviedb.org/).

---

## Acknowledgements

- [TMDb API](https://www.themoviedb.org/documentation/api)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Feel free to contribute or open issues for improvements!
