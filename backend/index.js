var express=require('express');
var app=express();
var session = require('express-session');

var path=require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

var dotenv=require('dotenv');
dotenv.config();

console.log(process.env.FRONTEND_URL);
const cors=require('cors');
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://skill-link-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {

    console.log("CORS Origin Received:", origin);

    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, '');

    const isAllowed = allowedOrigins.some(o =>
      o.replace(/\/$/, '') === normalizedOrigin
    );

    if (isAllowed) {
      return callback(null, true);
    }

    console.log("BLOCKED BY CORS:", origin);
    return callback(new Error("CORS not allowed"), false);
  },
  credentials: true
}));

app.use(express.json());

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Configure express-session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  },
}));

var connectDB=require('./db');
connectDB();

var authRouter=require('./routers/auth.router');
var serviceRouter=require('./routers/service.router');
    var adminRouter=require('./routers/admin.router');
var bookingRouter=require('./routers/booking.router');
var reviewRouter=require('./routers/review.router');
var userRouter=require('./routers/user.router');
app.use('/api/auth',authRouter);
app.use('/api/services',serviceRouter);
app.use('/api/admin',adminRouter);
app.use('/api/bookings',bookingRouter);
app.use('/api/reviews',reviewRouter);
app.use('/api/users',userRouter);


app.get('/',(req,res)=>{
    res.send("Welcome to Home Services API");
});

app.listen(process.env.PORT||5000,()=>{
    console.log("Server is running on port 5000");
})