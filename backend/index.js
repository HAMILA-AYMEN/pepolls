const express=require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const connectDB = require('./config/db')
require('dotenv').config({ path: './config/.env' })
const {requireAuth,checkUser} = require('./middleware/authMiddleware')
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user')
const postRouter=require('./routes/post')
const cors = require('cors');

const port = process.env.PORT || 5000

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));
// connect db
connectDB()

app.use(express.json())

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
  });






app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/post', postRouter);

app.listen(port, () => console.log(`server running on port ${port}`))