import dotenv from "dotenv";
import express from "express";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { query, validationResult, matchedData, body } from "express-validator";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set()

app.get("/", (req, res) => {
  res.render('index', { 
    title: 'Posts',
    message: 'Hello from EJS!'
  });
});

//Body Parser Middleware
app.use(express.json()); //allow send raw json ( Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. )
app.use(express.urlencoded({ extended: false })); //Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(cors({
  origin: 'https://express-js-vercel.vercel.app/.vercel.app'
}));

app.use(express.static(path.join(__dirname, "public")));

// Routes API
app.use("/api/posts", posts);

// Logger Middleware
app.use(logger);

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Your app listening at http://localhost:${port}`);
});
