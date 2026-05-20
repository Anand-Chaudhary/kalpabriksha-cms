import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan'
import cors from 'cors'
import cookie from 'cookie-parser'
import supabase from './db/dbConnect'
import authRoutes from './routes/auth.routes'
import galleryRoutes from './routes/gallery.routes'

dotenv.config()
console.log(supabase)

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.DEVELOPMENT_URL, process.env.PRODUCTION_URL];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true
}));
app.use(cookie())

app.use('/auth', authRoutes)
app.use('/gallery', galleryRoutes)

app.get("/", (_, res) => {
  res.send("Server is running");
});

export default app
